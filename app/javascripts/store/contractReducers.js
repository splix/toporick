import Web3 from "web3";
import Pudding from "ether-pudding";
import BasicSign from "contracts/BasicSign.sol.js";
import log from 'loglevel';
import _ from 'lodash';

const initialState = {
    web3: null,
    basicSign: null,
    filter: null
};

function connectWeb3(state, action) {
    switch (action.type) {
        case 'CONTRACT/SET_WEB3':
            const web3 = new Web3();
            const addr = action.addr;
            Pudding.setWeb3(web3);
            web3.setProvider(new web3.providers.HttpProvider(addr));
            BasicSign.load(Pudding);

            return _.assign(initialState, state,
                {web3: web3, basicSign: BasicSign.deployed()});
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
    state = connectWeb3(state, action);
    state = setFilter(state, action);
    return state;
};