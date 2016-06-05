import log from 'loglevel';
import fetchDocuments from './fetchDocuments';
import { startDocTransaction } from './transactions';

const instance = Math.round(100000000 * Math.random()).toString(16);
var sequence = 100;

export default function createDocument() {

    return function (dispatch, getState) {
        sequence++;
        const nonce = ['0x', instance, sequence.toString(16)].join('');
        const contract = getState().contracts.simpleSign;
        const web3 = getState().contracts.web3;
        const account = getState().config.get('account');
        log.debug('create doc', nonce, account);
        contract.createDocument(web3.toBigNumber(nonce), {from: account}).then((tx_id) => {
            log.info('document created', tx_id);
            contract.generateId.call(web3.toBigNumber(nonce)).then((docId) => {
                dispatch(startDocTransaction(tx_id, docId))
            });
            dispatch(fetchDocuments());
        });
    }
    
}