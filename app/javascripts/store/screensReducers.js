import Immutable from 'immutable'

var initialState = Immutable.fromJS({
    modal: null
});

export default function screenReducers(state, action) {
    state = state || initialState;
    switch (action.type) {
        case 'MODAL/SHOW':
            return state.set('modal', action.id);
        case 'MODAL/CLOSE':
            return state.set('modal', null);
        default:
            return state
    }    
}