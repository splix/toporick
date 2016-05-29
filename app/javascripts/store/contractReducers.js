import Web3 from "web3";
import Pudding from "ether-pudding";
import SimpleSign from "contracts/SimpleSign.sol.js";
import log from 'loglevel';
import _ from 'lodash';

const initialState = {
    web3: null,
    simpleSign: null
};

function connectWeb3(state, action) {
    switch (action.type) {
        case 'CONTRACT/SET_WEB3':
            const web3 = new Web3();
            const addr = action.addr;
            Pudding.setWeb3(web3);
            web3.setProvider(new web3.providers.HttpProvider(addr));
            SimpleSign.load(Pudding);

            return _.assign(initialState, state,
                {web3: web3, simpleSign: SimpleSign.deployed()});
        default:
            return state
    }
}

export const contractReducers = function(state, action) {
    state = state || initialState;
    state = connectWeb3(state, action);
    return state;
};