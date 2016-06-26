import React from 'react';
import { Provider, connect } from 'react-redux'
import log from 'loglevel';

import { generateId, createDocument } from '../store/createDocument';

const Render = ({nonce, docId, doCreate}) => {

    return (
        <div className="row">
            <div className="col-sm-10 col-sm-offset-1">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label col-sm-2">nonce</label>
                        <div className="col-sm-10">
                            <p className="form-control-static">{nonce}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Document ID</label>
                        <div className="col-sm-10">
                            <p className="form-control-static">{docId}</p>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-10 col-sm-offset-2">
                            <button className="btn btn-primary" onClick={doCreate}>Create Document</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

const CreateDoc = connect(
    (state, ownProps) => {
        return {
            nonce: state.app.getIn(['docCreate', 'nonce']),
            docId: state.app.getIn(['docCreate', 'id'])
        }
    },
    (dispatch, ownProps) => {
        return {
            doCreate: (e) => {
                e.preventDefault();
                dispatch(createDocument())
            }
        }
    }
)(Render);

export default CreateDoc;