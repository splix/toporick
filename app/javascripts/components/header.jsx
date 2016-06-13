import React from 'react';
import { connect } from 'react-redux'
import log from 'loglevel';
import Immutable from 'immutable';

const Render = ({account, accounts, selectAccount}) => {

    return (
        <nav className="navbar navbar-default">
                <div className="navbar-collapse" >
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Toporick &ETH;App</a>
                    </div>
                    <form className="navbar-form navbar-right" role="search">
                        <div className="form-group form-group-sm">
                            <label for="select-account">Account</label>
                            <select id="select-account" className="form-control" onChange={(e) => {e.preventDefault(); selectAccount(e.target.value)}}>
                                {accounts.map((acc) => {
                                    var selected = acc === account;
                                    return <option selected={selected}>{acc}</option>
                                })}
                            </select>
                        </div>
                    </form>
                </div>
        </nav>
    )
};

const Header = connect(
    (state, ownProps) => {
        return {
            accounts: state.config.get('accounts', []),
            account: state.config.get('account', null)
        }
    },
    (dispatch, ownProps) => {
        return {
            selectAccount: (acc) => dispatch({
                type: 'CONFIG/SELECT_ACCOUNT',
                account: acc
            })
        }
    }
)(Render);

export default Header;