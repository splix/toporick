import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import createDocument from '../store/createDocument';
import fetchDocuments from '../store/fetchDocuments';

import log from 'loglevel';

import DocMini from './docMini.jsx';

const DocList = ({items, onCreate, onReload}) => {

    var table = <table className="table">
        <thead>
            <tr>
                <th>Index</th>
                <th>ID</th>
                <th>Author</th>
                <th>Signatures</th>
            </tr>
        </thead>
        <tbody>
        {items.map( (doc) => {
            return <DocMini doc={doc} key={doc.idHex}/>;
        })}
        </tbody>
    </table>;

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Documents
                    <div className="btn-group">
                    <button className="btn btn-sm btn-default"
                            style={{marginLeft: "10px"}}
                            onClick={e => {e.preventDefault(); onCreate()}}><i className="fa fa-plus"/> Create Document</button>
                    <button className="btn btn-sm btn-default"
                            onClick={e => {e.preventDefault(); onReload()}}><i className="fa fa-refresh"/> Reload</button>
                    </div>
                </h1>
            </div>
            <div className="col-md-12">
                {table}
            </div>
        </div>
    )
};

DocList.propTypes = {
    items: PropTypes.array.isRequired,
    onCreate: PropTypes.func.isRequired
};

const DocumentsList = connect(
    (state, ownProps) => {
        return {
            items: state.app.getIn(['docList', 'items']).toJS().filter((x) => typeof x === 'object')
        }
    },
    (dispatch, ownProps) => {
        return {
            onCreate: () => {
                dispatch(createDocument())
            },
            onReload: () => {
                dispatch(fetchDocuments())
            }
        }
    }
)(DocList);

export default DocumentsList