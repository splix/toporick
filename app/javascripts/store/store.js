import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import documentsReducers from './documentReducers'
import showReducers from './showReducers'
import signatureReducers from './signaturesReducers'
import initialState from './initalState'
import Immutable from 'immutable'
import {reducer as formReducer} from 'redux-form';
import { configReducers } from './configReducers';
import { setAddress } from './config';
import { loadAccounts } from './contract';
import { contractReducers } from './contractReducers';
import fetchDocuments from '../store/fetchDocuments';

const stateTransformer = (state) => {
    return {
        app: state.app.toJS(), 
        form: state.form,
        config: state.config.toJS(),
        contracts: state.contracts
    };
};

const loggerMiddleware = createLogger({
    stateTransformer
});

const appReducers = function(state, action) {
    state = state || initialState;
    state = documentsReducers(state, action);
    state = showReducers(state, action);
    state = signatureReducers(state, action);
    return state
};

const reducers = {
    app: appReducers,
    form: formReducer,
    config: configReducers,
    contracts: contractReducers
};

export const store = createStore(
    combineReducers(reducers),
    applyMiddleware(
        thunkMiddleware, 
        loggerMiddleware
    )
);

store.dispatch(setAddress('http://localhost:8545'));
store.dispatch(loadAccounts());
store.dispatch(fetchDocuments());

