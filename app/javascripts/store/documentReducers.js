import { combineReducers } from 'redux'
import initialState from './initalState'
import Immutable from 'immutable'
import log from 'loglevel';

function loadingItems(state, action) {
    switch (action.type) {
        case 'DOCUMENTS/LOADING':
            return state.setIn(['docList', 'loading'], action.value);
        default:
            return state
    }
}

function setItems(state, action) {
    switch (action.type) {
        case 'DOCUMENTS/SET_ITEMS':
            return state.setIn(['docList', 'items'], Immutable.fromJS(action.items));
        default:
            return state
    }
}

function incSignsCount(state, action) {
    switch (action.type) {
        case 'DOCUMENT/INC_SIGNS_COUNT':
            const documentId = action.documentId;
            return state
                    .updateIn(['doc', 'document', 'signsCount'], (curr) => curr + 1)
                    .updateIn(['docList', 'items'], (items) => {
                        const index = items.findIndex((i) => i.get('id') === documentId);
                        if (index === -1) {
                            return items
                        }
                        return items.updateIn([index, 'signsCount'], (curr) => curr + 1)
                    });
        default:
            return state
    }
}

function setDocument(state, action) {
    switch (action.type) {
        case 'DOCUMENTS/SET_DOCUMENT':
            const document = action.document;
            return state.updateIn(['docList', 'items'], (items) => {
                const index = items.findIndex((i) => i.get('id') === document.id);
                if (index === -1) {
                    return items
                }
                return items.update(index, (i) => Immutable.fromJS(document))
            }).update('doc', (doc) =>
                doc.set('id', document.id)
                    .set('loaded', true)
                    .set('loading', false)
                    .set('document', Immutable.fromJS(document))
            ).update('signatures', (signatures) => 
                signatures.set('loaded', false)
                    .set('items', Immutable.fromJS([]))
            );
        default:
            return state
    }
}

const documentsReducers = function(state, action) {
    state = state || initialState;
    state = loadingItems(state, action);
    state = setItems(state, action);
    state = setDocument(state, action);
    state = incSignsCount(state, action);
    return state
};

export default documentsReducers