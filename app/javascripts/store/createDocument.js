import log from 'loglevel';
import { startDocTransaction } from './transactions';

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
        log.debug('create doc', nonce, account);
        contract.createDocument(web3.toBigNumber(nonce), {from: account}).then((tx_id) => {
            log.info('document created', tx_id);
            contract.generateId.call(web3.toBigNumber(nonce)).then((docId) => {
                dispatch(startDocTransaction(tx_id, docId))
            });
        });
    }
    
}