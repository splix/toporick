import { transactionTemplate } from './initalState';

function startTransaction(state, action) {
    switch (action.type) {
        case 'TRANSACTION/START':
            var tr = transactionTemplate
                .set('id', action.id)
                .set('type', action.txType)
                .set('documentId', action.documentId);
            if (action.txType === 'signature') {
                tr = tr.set('signatureId', action.signatureId);
            }
            return state.update('transactions', (curr) => curr.push(tr));
        default:
            return state
    }
}

function seenTransaction(state, action) {
    switch (action.type) {
        case 'TRANSACTION/SEEN':
            return state.update('transactions', (trans) => {
                const index = trans.findIndex((tr) =>
                    tr.get('id') === action.id
                );
                if (index === -1) {
                    return trans
                }
                return trans.update(index, (tr) =>
                    tr.set('seen', true).set('blockHash', action.blockHash)
                )
            });
        default:
            return state
    }
}

const transactionsReducers = function(state, action) {
    state = startTransaction(state, action);
    state = seenTransaction(state, action);
    return state
};

export default transactionsReducers