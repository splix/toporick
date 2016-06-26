import log from 'loglevel'
import _ from 'lodash'
import { startSignatureTransaction } from './transactions'

function updateSignature(details) {
    return {
        type: "SIGNATURE/SET_DETAILS",
        details: details
    }
}

export function loadSignature(doc, i) {
    log.debug('load signature', doc.id, i);
    return function (dispatch, getState) {
        dispatch(updateSignature({id: i}));
        const contract = getState().contracts.basicSign;
        const web3 = getState().contracts.web3;
        contract.getSignDetails.call(doc.id, web3.toBigNumber(i)).then((resp) => {
            log.debug('got sign details', resp);
            if (resp[1] === '0x') { //doesn't exists or not in the blockchain
                log.warn("Unknown signature", doc.id, i);
                return
            }
            dispatch(updateSignature({
                id: i,
                signer: resp[0],
                type: web3.toAscii(resp[1])
            }));
            contract.getSignData.call(doc.id, web3.toBigNumber(i)).then((resp) => {
                log.debug('got sign data 2', resp);
                if (resp === '0x') { //doesn't exists or not in the blockchain
                    log.warn("Unknown signature", doc.id, i);
                    return
                }
                dispatch(updateSignature({id: i, sign: resp}));
            });
        });
    };

}

export function loadSignatures(doc) {
    log.debug('load signatures', doc.id, doc.signsCount);
    return function (dispatch) {
        _.map(_.range(0, doc.signsCount), (i) => {
            dispatch(loadSignature(doc, i));
        });
    };
}

export function createSignature(typeOriginal, sign, doc) {

    return function (dispatch, getState) {
        const web3 = getState().contracts.web3;
        const type = web3.toBigNumber(typeOriginal);
        const doc = doc || getState().app.getIn(['doc', 'document']).toJS();
        const docId = doc.id;
        const contract = getState().contracts.basicSign;
        const account = getState().config.get('account');
        contract.addSignature(docId, type, sign, {from: account, gas: 2000000}).then((tx_id) => {
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
            var signId = singsCount - 1;
            dispatch(startSignatureTransaction(tx_id, docId, signId));
            dispatch(updateSignature({id: signId, type: web3.toAscii(typeOriginal)}));
            dispatch(loadSignature(doc, signId));
        // }).catch((e) => {
        //     log.error("failed to create signature: ", e);
            // dispatch(error('failed to create signature: ' + e));
        });

    }

}