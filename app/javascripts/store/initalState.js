import Immutable from 'immutable'

const state = {
    doc: {
        id: null,
        loading: false,
        loaded: false,
        document: null
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
    }
};

export default Immutable.fromJS(state)