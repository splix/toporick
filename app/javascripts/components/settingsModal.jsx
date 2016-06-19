import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form'
import { Modal, Button } from 'react-bootstrap';
import { closeModal } from '../store/screens';
import Immutable from 'immutable';

const Render = ({fields: {addr, account}, accounts, show, onClose, handleSubmit}) => {

    return (
        <Modal show={show} onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>Ethereum RPC Settings</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className="form">
                        <div className="form-group">
                            <label>RPC Server</label>
                            <input type="text" className="form-control" {...addr}/>
                        </div>
                        <div className="form-group">
                            <label>Account</label>
                            <select className="form-control" {...account}>
                                {accounts.map((acc) =>
                                <option value={acc} key={acc}>{acc}</option>
                                )}
                            </select>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={onClose}>Close</Button>
                    <Button bsStyle="primary"
                            onClick={(e) => {e.preventDefault(); handleSubmit()}}>Save changes</Button>
                </Modal.Footer>

        </Modal>
    )
};

const Model = connect(
    (state, ownProps) => {
        return {
            show: state.screen.get('modal') == 'settings',
            accounts: state.config.get('accounts', [])
        }
    },
    (dispatch, ownProps) => {
        return {
            onClose: () => {
                dispatch(closeModal());
            }
        }
    }
)(Render);

const SettingsModal = reduxForm({
    form: 'settingModal',
    fields: ['addr', 'account'],
    onSubmit: function(inputs, dispatch) {
        dispatch({
            type: 'CONFIG/SELECT_ACCOUNT',
            account: inputs.account
        });
        dispatch({
            type: 'CONFIG/SET_ADDR',
            addr: inputs.addr
        });
        dispatch(closeModal());
    },
    validate: (values) => {
        const errors = {};
        return errors
    }
}, (state) => ({
        initialValues: {
            addr: state.config.get('addr', ''),
            account: state.config.get('account', null)
        }
    })
)(Model);

export default SettingsModal;