import {web3, contract, accounts} from './contract';
import log from 'loglevel';
import fetchDocuments from './fetchDocuments'; 

export default function createDocument() {

    return function (dispatch) {
        contract.createDocument({from: accounts[0]}).then(function (tx_id) {
            log.info('document created', tx_id);
            dispatch(fetchDocuments());
        });
    }
    
}