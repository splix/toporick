import log from 'loglevel';
import _ from 'lodash';
import {loadSignatures} from './signatures'

function requestDocuments() {
    return {
        type: "DOCUMENTS/LOADING",
        value: true
    }
}

function setDocuments(docs) {
    return {
        type: "DOCUMENTS/SET_ITEMS",
        items: docs
    }
}

function setDocument(doc) {
    return {
        type: "DOCUMENTS/SET_DOCUMENT",
        document: doc
    }
}

function fetchDocumentById(index, id) {
    return function (dispatch, getState) {
        const contract = getState().contracts.simpleSign;
        contract.getDocumentDetails.call(id).then((resp) => {
            log.debug('got doc details', index, id, resp);
            var doc = {
                id: id,
                index: index,
                organizer: resp[0],
                signsCount: resp[1].toNumber()
            };
            dispatch(setDocument(doc));
            dispatch(loadSignatures(doc));
        });
    }
}

function fetchDocumentByIndex(index) {
    return function (dispatch, getState) {
        const contract = getState().contracts.simpleSign;
        const web3 = getState().contracts.web3;
        contract.getIdAtIndex.call(web3.toBigNumber(index)).then((id) => {
            dispatch(fetchDocumentById(index, id))
        });
    }
}

export default function fetchDocuments() {

    return function (dispatch, getState) {
        dispatch(requestDocuments());
        // log.debug('contact', contract);
        const contract = getState().contracts.simpleSign;
        contract.getDocumentsCount.call().then(function(count) {
            const nmax = count.toNumber();
            const n = 10;
            var start = nmax - n;
            if (start < 0) {
                start = 0;
            }
            log.debug('get documents', start, nmax);
            const emptyDocs = _.range(start, nmax).map( (index) => {
                return {index: index}
            });
            dispatch(setDocuments(emptyDocs));
            emptyDocs.map((doc) =>
                dispatch(fetchDocumentByIndex(doc.index))
            );
        });
    }
}