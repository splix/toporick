import React from 'react';
import { connect } from 'react-redux';
import { Tooltip, OverlayTrigger, Modal, Button } from 'react-bootstrap';
import SettingsModal from './settingsModal.jsx';
import { showModal } from '../store/screens'

const Render = ({addr, account, env, showSettings}) => {

    if (env !== 'web') {
        return (<div/>);
    }

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
                        <li><button className="btn btn-default" onClick={showSettings}><i className="fa fa-bars"/></button></li>
                    </ul>
                </div>

                <SettingsModal />
        </nav>
    )
};

const Header = connect(
    (state, ownProps) => {
        return {
            account: state.config.get('account', null),
            addr: state.config.get('addr', ''),
            env: state.config.get('environment')
        }
    },
    (dispatch, ownProps) => {
        return {
            showSettings: () => {
                dispatch(showModal('settings'));
            }
        }
    }
)(Render);

export default Header;