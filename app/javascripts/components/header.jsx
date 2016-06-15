import React from 'react';
import { connect } from 'react-redux'
import log from 'loglevel';
import Immutable from 'immutable';

const Render = ({addr, account, accounts, selectAccount, setAddr}) => {
    return (
        <nav className="navbar navbar-default">
                <div className="navbar-collapse" >
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Toporick &ETH;App</a>
                    </div>
                    <form className="navbar-form navbar-right" role="search">
                        <div className="form-group form-group-sm">
                            <input id="select-addr" type="text" className="form-control"
                                   value={addr}/>
                        </div>
                        <div className="form-group form-group-sm">
                            <label htmlFor="select-account">Account</label>
                            <select id="select-account"
                                    className="form-control"
                                    onChange={(e) => {e.preventDefault(); selectAccount(e.target.value)}}
                                    value={account}>
                                {accounts.map((acc) => {
                                    return <option value={acc} key={acc}>{acc}</option>
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
            account: state.config.get('account', null),
            addr: state.config.get('addr', '')
        }
    },
    (dispatch, ownProps) => {
        return {
            selectAccount: (acc) => dispatch({
                type: 'CONFIG/SELECT_ACCOUNT',
                account: acc
            }),
            setAddr: (addr) => dispatch({
                type: 'CONFIG/SET_ADDR',
                addr: addr
            })
        }
    }
)(Render);

export default Header;