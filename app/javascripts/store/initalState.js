import Immutable from 'immutable'

export const transactionTemplate = Immutable.fromJS({
    id: null,
    seen: false,
    block: null,
    type: null,
    documentId: null
});

export const initialState = Immutable.fromJS({
    doc: {
        id: null,
        loading: false,
        loaded: false,
        document: null
    },
    docCreate: {
        nonce: null,
        id: null,
        signatures: []
    },
    docList: {
        loaded: false,
        loading: false,
        page: 0,
        pageSize: 10,
        items: []
    },
    signatures: {
        loaded: false,
        loading: false,
        items: []
    },
    addSignature: {
        type: '',
        signature: ''
    },
    transactions: []
});