import Immutable from 'immutable'

function setDocument(state, action) {
    switch (action.type) {
        case 'SHOW/DOCUMENT':
            return state
                    .setIn(['doc', 'document'], Immutable.fromJS(action.document))
                    .update('signatures', (signatures) =>
                        signatures
                            .set('loaded', false)
                            .set('items', Immutable.List.of())
                    );
        default:
            return state
    }
}

const showReducers = function(state, action) {
    state = setDocument(state, action);
    return state
};

export default showReducers