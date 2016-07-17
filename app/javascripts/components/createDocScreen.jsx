import React from 'react';
import { Provider, connect } from 'react-redux'
import log from 'loglevel';
import Web3 from "web3";

import { generateId, createDocument, addSignature, removeSignature } from '../store/createDocument';
import AddSign from './addSign.jsx';

const web3 = new Web3();

const Render = ({nonce, docId, signatures, canSend, doCreate, doAddSignature, doRemoveSignature}) => {

    var submit = null;
    if (canSend) {
        submit = <button className="btn btn-primary" onClick={doCreate}><i className="fa fa-save"/> Send to Blockchain</button>
    } else {
        submit = <div className="alert alert-info">
            DApp isn't connected to Ethereum or all accounts are locked
        </div>
    }

    return (
        <div className="create-doc">

            <div className="row">
                <label className="control-label col-sm-2">nonce</label>
                <div className="col-sm-10">{nonce}</div>
            </div>
            <div className="row">
                <label className="control-label col-sm-2">Document ID</label>
                <div className="col-sm-10">{docId}</div>
            </div>

            <div className="row">
                <label className="control-label col-sm-2">Signatures</label>
                <div className="col-sm-10">
                    <table className="table">
                        <tbody>
                        {signatures.map ((s, idx) =>
                            <tr key={''+s.type + ':'+s.value} onClick={(e) => doRemoveSignature(idx)}>
                                <td>{s.type}</td>
                                <td>{s.value}</td>
                                <td><button className="btn btn-default"><i className="fa fa-remove"/> Remove</button></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="row">
                <div className="col-sm-10 col-sm-offset-2">
                    <AddSign onSubmit={doAddSignature}/>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-10 col-sm-offset-1 text-center">
                    {submit}
                </div>
            </div>


        </div>
    )
};

const CreateDoc = connect(
    (state, ownProps) => {
        return {
            nonce: state.app.getIn(['docCreate', 'nonce']),
            docId: state.app.getIn(['docCreate', 'id']),
            signatures: state.app.getIn(['docCreate', 'signatures']).toJS(),
            canSend: state.contracts.ready && state.config.get('account') !== null
        }
    },
    (dispatch, ownProps) => {
        return {
            doCreate: (e) => {
                e.preventDefault();
                dispatch(createDocument())
            },
            doAddSignature: (inputs, dispatch) => {
                log.debug('add signature', inputs);
                var sign = inputs.sign;
                if (!sign.startsWith('0x')) {
                    sign = '0x' + sign;
                }
                dispatch(addSignature(
                    inputs.type,
                    sign
                ))
            },
            doRemoveSignature: (idx) => {
                dispatch(removeSignature(idx));
            }
        }
    }
)(Render);

export default CreateDoc;