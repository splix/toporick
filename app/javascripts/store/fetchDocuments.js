import log from 'loglevel';
import _ from 'lodash';
import {loadSignatures} from './signatures'

function setDocuments(docs) {
    return {
        type: "DOCUMENTS/SET_ITEMS",
        items: docs
    }
}

export function setDocument(doc) {
    return {
        type: "DOCUMENTS/SET_DOCUMENT",
        document: doc
    }
}

export function fetchDocumentById(index, id) {
    return function (dispatch, getState) {
        const contract = getState().contracts.basicSign;
        const web3 = getState().contracts.web3;
        contract.getDocumentDetails.call(id).then((resp) => {
            log.debug('got doc details', index, id, resp);
            var doc = {
                id: id,
                idHex: web3.toHex(id), 
                index: index,
                organizer: resp[0],
                signsCount: resp[1].toNumber()
            };
            dispatch(setDocument(doc));
            dispatch(loadSignatures(doc));
        });
    }
}