import log from 'loglevel';

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
            dispatch({
                type: 'CONFIG/SELECT_ACCOUNT',
                account: accs[0]
            });
        });
    }
}
