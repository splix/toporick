import React from 'react';
import { Provider, connect } from 'react-redux'

import { showScreen } from '../store/screens'
import { generateId } from '../store/createDocument';

const Render = ({onCreate}) => {

    return (
        <div className="row">
            <div className="col-sm-10 col-sm-offset-1">
                <p>To view details of an existing document, click on a document from list bellow (if there any).</p>
                <p>Or create a new document:
                    <button className="btn btn-primary" onClick={onCreate}><i className="fa fa-plus"/> Create New Document</button></p>
            </div>
        </div>
    )
};

const StartScreen = connect(
    (state, ownProps) => {
        return {
        }
    },
    (dispatch, ownProps) => {
        return {
            onCreate: (e) => {
                e.preventDefault();
                dispatch(showScreen('create-doc'));
                dispatch(generateId());
            }
        }
    }
)(Render);

export default StartScreen;