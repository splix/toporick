import Web3 from "web3";
import Pudding from "ether-pudding";
import SimpleSign from "contracts/SimpleSign.sol.js";
import log from 'loglevel';

export const web3 = new Web3();
Pudding.setWeb3(web3);
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
SimpleSign.load(Pudding);

export var accounts = [];

web3.eth.getAccounts( (err, accs) => {
    if (err != null) {
        log.error("There was an error fetching your accounts.", err);
        return
    }

    if (accs.length == 0) {
        log.error("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return
    }

    accounts = accs;
});

export const contract = SimpleSign.deployed();

export default contract;
