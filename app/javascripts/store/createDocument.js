import {web3, contract, accounts} from './contract';
import log from 'loglevel';
import fetchDocuments from './fetchDocuments';

const instance = Math.round(100000000 * Math.random()).toString(16);
var sequence = 100;

export default function createDocument() {

    return function (dispatch) {
        sequence++;
        const nonce = ['0x', instance, sequence.toString(16)].join('');
        log.debug('nonce', nonce);
        contract.createDocument(web3.toBigNumber(nonce), {from: accounts[0]}).then((tx_id) => {
            log.info('document created', tx_id);
            dispatch(fetchDocuments());
        });
    }
    
}