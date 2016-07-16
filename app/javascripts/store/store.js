import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import documentsReducers from './documentReducers'
import showReducers from './showReducers'
import signatureReducers from './signaturesReducers'
import { initialState } from './initalState'
import Immutable from 'immutable'
import {reducer as formReducer} from 'redux-form';
import { configReducers } from './configReducers';
import { setAddress, setEnvironment } from './config';
import { loadAccounts, setupWeb3 } from './contract';
import { contractReducers } from './contractReducers';
import { startWatcher, listenForNewDocuments } from './transactions';
import transactionReducers from './transactionsReducers';
import screensReducers from './screensReducers';
import { showScreen } from './screens';
import _ from 'lodash';

const stateTransformer = (state) => {
    return {
        app: state.app.toJS(), 
        form: state.form,
        config: state.config.toJS(),
        contracts: _.omit(state.contracts, ['web3', 'mist']),
        screen: state.screen.toJS()
    };
};

const actionTransformer = (action) => {
    return _.omit(action, ['web3', 'mist'])
};

const loggerMiddleware = createLogger({
    stateTransformer, actionTransformer
});

const appReducers = function(state, action) {
    state = state || initialState;
    state = documentsReducers(state, action);
    state = showReducers(state, action);
    state = signatureReducers(state, action);
    state = transactionReducers(state, action);
    return state
};

const reducers = {
    app: appReducers,
    form: formReducer,
    config: configReducers,
    contracts: contractReducers,
    screen: screensReducers
};

export const store = createStore(
    combineReducers(reducers),
    applyMiddleware(
        thunkMiddleware, 
        loggerMiddleware
    )
);

if (typeof mist !== 'undefined') { //provided byt mist
    store.dispatch(setEnvironment('mist'));
} else if (typeof web3 !== 'undefined') { //provided by metamask
    store.dispatch(setEnvironment('metamask'));
} else {
    store.dispatch(setAddress('http://localhost:8545'));
}
store.dispatch(setupWeb3(window.web3, window.mist));
store.dispatch(loadAccounts());
store.dispatch(startWatcher());
store.dispatch(listenForNewDocuments());
store.dispatch(showScreen('start'));

