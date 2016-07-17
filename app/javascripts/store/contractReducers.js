import Web3 from "web3";
import Pudding from "ether-pudding";
import BasicSign from "contracts/BasicSign.sol.js";
import log from 'loglevel';
import _ from 'lodash';

const initialState = {
    web3: null,
    mist: null,
    provided: false,
    basicSign: null,
    filter: null,
    ready: false
};

function setupWeb3(state, action) {
    switch (action.type) {
        case 'CONTRACT/SETUP_WEB3':
            var currentWeb3 = action.web3;
            var contract = null;
            const ready = typeof currentWeb3 !== 'undefined';
            if (ready) {
                Pudding.setWeb3(currentWeb3);
                BasicSign.load(Pudding);
                contract = BasicSign.deployed();
            }
            return _.assign(initialState, state, {
                web3: currentWeb3,
                provided: action.provided,
                basicSign: contract,
                mist: action.mist,
                ready: ready
            });
        default:
            return state
    }
}

function setFilter(state, action) {
    switch (action.type) {
        case 'CONTRACT/SET_FILTER':
            if (state.filter !== null) {
                state.filter.stopWatching();
            }
            return _.assign(initialState, state,
                {filter: action.filter});
        default:
            return state
    }
}

export const contractReducers = function(state, action) {
    state = state || initialState;
    state = setupWeb3(state, action);
    state = setFilter(state, action);
    return state;
};