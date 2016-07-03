import log from 'loglevel';
import { startDocTransaction } from './transactions';
import { createSignature } from './signatures';
import { setDocument } from './fetchDocuments';

const instance = Math.round(100000000 * Math.random()).toString(16);
var sequence = 1000;

export function generateId() {
    return function (dispatch, getState) {
        sequence++;
        const nonce = ['0x', instance, sequence.toString(16)].join('');
        const contract = getState().contracts.basicSign;
        const web3 = getState().contracts.web3;
        const account = getState().config.get('account');

        contract.generateId.call(web3.toBigNumber(nonce), {from: account}).then((docId) => {
            dispatch({
                type: 'DOCUMENT_CREATE/SET_ID',
                nonce: nonce,
                id: web3.toHex(docId)
            })
        })
    }
}

export function createDocument() {
    return function (dispatch, getState) {
        const contract = getState().contracts.basicSign;
        const web3 = getState().contracts.web3;
        const account = getState().config.get('account');
        const nonce = getState().app.getIn(['docCreate', 'nonce']);
        const docId = getState().app.getIn(['docCreate', 'id']);
        const signatures = getState().app.getIn(['docCreate', 'signatures']).toJS();
        log.debug('create doc', nonce, account, signatures);
        contract.createDocument(web3.toBigNumber(nonce), {from: account}).then((tx_id) => {
            log.info('document created', tx_id);
            contract.generateId.call(web3.toBigNumber(nonce)).then((docId) => {
                dispatch(startDocTransaction(tx_id, docId));
                const doc = {
                    id: docId,
                    idHex: web3.toHex(docId),
                    organizer: account,
                    signsCount: 0
                };
                dispatch(setDocument(doc));
                signatures.map((sign, idx) => {
                    const doc = {
                        id: docId,
                        signsCount: idx
                    };
                    dispatch(createSignature(
                        web3.fromAscii(sign.type, 16), sign.value, doc
                    ))
                })
            });
        });
    }
    
}

export function addSignature(type, value) {
    return {
        type: 'DOCUMENT_CREATE/ADD_SIGNATURE',
        sign_type: type,
        sign_value: value
    }
}

export function removeSignature(idx) {
    return {
        type: 'DOCUMENT_CREATE/REMOVE_SIGNATURE',
        index: idx
    }
}