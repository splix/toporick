import { loadSignature } from './signatures'
import { setDocument } from './fetchDocuments'
import log from 'loglevel'

export function startDocTransaction(tx_id, docId) {
    return {
        type: 'TRANSACTION/START',
        txType: 'document',
        id: tx_id,
        documentId: docId
    }
}

export function startSignatureTransaction(tx_id, docId, signId) {
    return {
        type: 'TRANSACTION/START',
        txType: 'signature',
        id: tx_id,
        documentId: docId,
        signatureId: signId
    }
}

function transactionSeen(tx_id, blockHash) {
    return {
        type: 'TRANSACTION/SEEN',
        id: tx_id,
        block: blockHash
    }
}

export function startWatcher() {
    return function(dispatcher, getState) {
        const web3 = getState().contracts.web3;
        var filter = web3.eth.filter('latest');
        dispatcher({
            type: 'CONTRACT/SET_FILTER',
            filter: filter
        });
        filter.watch((error, blockHash) => {
            if (error) {
                log.error('watch error', error);
                return;
            }
            var unseen = getState().app.get('transactions').filter((tx) => !tx.get('seen')).toJS();
            if (unseen.length == 0) {
                return;
            }
            var count = web3.eth.getBlockTransactionCount(blockHash);
            var blockTxs = [];
            for (var i = 0; i < count; i++) {
                var transaction = web3.eth.getTransactionFromBlock(blockHash, i);
                blockTxs.push(transaction.hash);
            }
            // log.debug('block', blockHash, blockTxs);
            var found = unseen.filter((tx) => blockTxs.indexOf(tx.id) >= 0);
            // log.info("found in the block", found);
            found.forEach((tx) => {
                dispatcher(transactionSeen(tx.id, blockHash));
                if (tx.type === 'signature') {
                    dispatcher(loadSignature({id: tx.documentId}, tx.signatureId))
                } else if (tx.type === 'document') {
                }
            })
        });
    }
}

export function listenForNewDocuments() {
    return function (dispatcher, getState) {
        const web3 = getState().contracts.web3;
        const contract = getState().contracts.basicSign;
        contract.Created((err, result) => {
            if (err !== null) {
                log.error("Event Error", err, result);
                return;
            }
            log.debug('Document Created Event', result);
            const event = result.args;
            const doc = {
                id: event.id,
                idHex: web3.toHex(event.id),
                organizer: event.from,
                signsCount: 0
            };
            dispatcher(setDocument(doc));
        })
    }
}

