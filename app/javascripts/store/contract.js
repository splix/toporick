import log from 'loglevel';

export function setupWeb3(web3, mist) {
    return function(dispatch, getState) {
        if (typeof web3 !== 'undefined' && web3 !== null) {
            // Web3 has been injected by the browser (Mist/MetaMask)
            log.info("provided web3");
            dispatch({
                type: 'CONTRACT/SETUP_WEB3',
                provided: true,
                web3: new Web3(web3.currentProvider),
                mist: mist
            });
        } else {
            const currentWeb3 = new Web3();
            const addr = getState().config.get('addr');
            currentWeb3.setProvider(new currentWeb3.providers.HttpProvider(addr));
            dispatch({
                type: 'CONTRACT/SETUP_WEB3',
                provided: false,
                web3: currentWeb3
            });
        }
    }
}

export function loadAccounts() {
    return function(dispatch, getState) {
        const web3 = getState().contracts.web3;
        web3.eth.getAccounts( (err, accs) => {
            if (err != null) {
                log.error("There was an error fetching your accounts.", err);
                return
            }

            if (accs.length == 0) {
                log.error("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return
            }
            dispatch({
                type: 'CONFIG/SET_ACCOUNTS',
                accounts: accs
            });
            var account = null;
            if (accs.length > 0) {
                account = accs[0];
            }
            dispatch({
                type: 'CONFIG/SELECT_ACCOUNT',
                account: account
            });
        });
    }
}
