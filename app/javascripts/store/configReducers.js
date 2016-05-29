import Immutable from 'immutable';

const initial = Immutable.fromJS({
    addr: 'http://localhost:8545',
    connected: false,
    accounts: [],
    account: null
});

function setAddr(state, action) {
    switch (action.type) {
        case 'CONFIG/SET_ADDR':
            return state.set('addr', action.addr);
        default:
            return state
    }
}

function setConnected(state, action) {
    switch (action.type) {
        case 'CONFIG/SET_CONNECTED':
            return state.set('connected', action.connected);
        default:
            return state
    }
}

function setAccounts(state, action) {
    switch (action.type) {
        case 'CONFIG/SET_ACCOUNTS':
            return state.set('accounts', action.accounts);
        default:
            return state
    }
}

function selectAccount(state, action) {
    switch (action.type) {
        case 'CONFIG/SELECT_ACCOUNT':
            return state.set('account', action.account);
        default:
            return state
    }
}

export const configReducers = function(state, action) {
    state = state || initial;
    state = setAddr(state, action);
    state = setConnected(state, action);
    state = setAccounts(state, action);
    state = selectAccount(state, action);
    return state;
};