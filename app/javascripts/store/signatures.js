import {web3, contract, accounts} from './contract';
import log from 'loglevel'
import _ from 'lodash'

function updateSignature(details) {
    return {
        type: "SIGNATURE/SET_DETAILS",
        details: details
    }
}

export function loadSignature(doc, i) {
    log.debug('load signature', doc.id.toNumber(), i);
    return function (dispatch) {
        dispatch(updateSignature({id: i}));

        contract.getSignDetails.call(doc.id, web3.toBigNumber(i)).then((resp) => {
            // log.debug('got sign details', resp);
            dispatch(updateSignature({
                id: i,
                signer: resp[0],
                type: web3.toAscii(resp[1])
            }));
        });
        contract.getSignData.call(doc.id, web3.toBigNumber(i)).then((resp) => {
            // log.debug('got sign data', resp);
            dispatch(updateSignature({id: i, sign: resp}));
        });
    };

}

export function loadSignatures(doc) {
    log.debug('load signatures', doc.id.toNumber(), doc.signsCount);
    return function (dispatch) {
        _.map(_.range(0, doc.signsCount), (i) => {
            dispatch(loadSignature(doc, i));
        });
    };
}

export function createSignature(type, sign) {

    return function (dispatch, getState) {
        type = web3.toBigNumber(type);
        const doc = getState().app.getIn(['doc', 'document']).toJS();
        const docId = doc.id;
        contract.addSignature(docId, type, sign, {from: accounts[0], gas: 2000000}).then((tx_id) => {
            log.info('signature created', docId, type, sign, tx_id);
            dispatch({
                type: "redux-form/RESET",
                form: "addSignature"
            });
            dispatch({
                type: "DOCUMENT/INC_SIGNS_COUNT",
                documentId: docId
            });
            const singsCount = doc.signsCount + 1;
            updateSignature({id: singsCount-1});
            dispatch(loadSignature(doc, singsCount - 1));
        // }).catch((e) => {
        //     log.error("failed to create signature: ", e);
            // dispatch(error('failed to create signature: ' + e));
        });

    }

}