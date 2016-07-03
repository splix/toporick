import React from 'react';
import { Provider, connect } from 'react-redux'

import { showScreen } from '../store/screens'
import { generateId } from '../store/createDocument';

const Render = ({onCreate}) => {

    return (
        <div className="row">
            <div className="col-sm-5 col-sm-offset-1">
                <h3>See latest documents</h3>
                <p><i className="fa fa-2x fa-arrow-down direction"/>
                    To view details of an existing document, click on a document from list bellow (if there any)</p>
            </div>
            <div className="col-sm-5">
                <h3>Create a new document</h3>
                <button className="btn btn-primary" onClick={onCreate}><i className="fa fa-plus"/> Create New Document</button>
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