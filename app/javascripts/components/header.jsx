import React from 'react';
import { connect } from 'react-redux';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';


const Render = ({addr, account}) => {

    const shortAcct = (acct) => {
        if (acct == null) {
            return '(not set)';
        }
        return acct.substr(0, 8) + '...'
    };

    const addrTooltip = (
        <Tooltip id="account-tooltip">{account}</Tooltip>
    );

    return (
        <nav className="navbar navbar-default">
                <div className="navbar-collapse" >
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Toporick &ETH;App</a>
                    </div>
                    <ul className="nav navbar-nav navbar-right settings">
                        <li><i className="fa fa-exchange"/></li>
                        <li>{addr}</li>
                        <li><OverlayTrigger placement="bottom" overlay={addrTooltip}><span>{shortAcct(account)}</span></OverlayTrigger></li>
                        <li><button className="btn btn-default"><i className="fa fa-bars"/></button></li>
                    </ul>
                </div>
        </nav>
    )
};

const Header = connect(
    (state, ownProps) => {
        return {
            account: state.config.get('account', null),
            addr: state.config.get('addr', '')
        }
    },
    (dispatch, ownProps) => {
        return {
        }
    }
)(Render);

export default Header;