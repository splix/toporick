import {web3, contract} from './contract';
import log from 'loglevel';
import _ from 'lodash';
import {loadSignatures} from './signatures'

function requestDocuments() {
    return {
        type: "DOCUMENTS/LOADING",
        value: true
    }
}

function getDocumentsCount() {
    return new Promise((resolve, reject) => {

    });
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

function fetchDocument(id) {
    return function (dispatch) {
        contract.getDocumentDetails.call(id).then(function(resp) {
            log.debug('got doc details', arguments);
            var doc = {
                id: id,
                idNumeric: id.toNumber(),
                organizer: resp[0],
                signsCount: resp[1].toNumber()
            };
            dispatch(setDocument(doc));
            dispatch(loadSignatures(doc));
        }).catch(function(err) {
            log.error(err)
        });        
    }
}

export default function fetchDocuments() {

    return function (dispatch) {
        dispatch(requestDocuments());
        // log.debug('contact', contract);
        contract.getDocumentsCount.call().then(function(count) {
            const nmax = count.toNumber();
            const n = 10;
            var start = nmax - n;
            if (start < 0) {
                start = 0;
            }
            log.debug('get documents', start, nmax);
            const emptyDocs = _.range(start, nmax).map( (id) => {
                return {id: web3.toBigNumber(id)}
            });
            dispatch(setDocuments(emptyDocs));
            emptyDocs.map((doc) => dispatch(fetchDocument(doc.id)));
        });
    }
}