import Immutable from 'immutable'

var initialState = Immutable.fromJS({
    modal: null,
    screen: null
});

export default function screenReducers(state, action) {
    state = state || initialState;
    switch (action.type) {
        case 'MODAL/SHOW':
            return state.set('modal', action.id);
        case 'MODAL/CLOSE':
            return state.set('modal', null);
        case 'SCREEN/SHOW':
            return state.set('screen', action.id);
        default:
            return state
    }    
}