import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import log from 'loglevel';

import DocMini from './docMini.jsx';

const DocList = ({items}) => {

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

    var msg = '';
    if (items.length > 0) {
        msg = 'This list contains only documents that were created after dapp startup. ' +
            'Toporic DApp watches for new documents in the blockchain and adds it to the list. ' +
            'Any documents that were created before the moment when you opened the app aren\'t listed here'
    } else {
        msg = 'This list will contain documents that will be created during current session. ' +
            'Toporic DApp watches for new documents in the blockchain and adds it to the list. ' +
            'Any documents that were created before the moment when you opened the app aren\'t listed here'
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Latest Documents</h1>
            </div>
            <div className="col-md-12">
                {table}
            </div>
            <div className="col-md-10 col-md-offset-1">
                <p className="alert alert-info">
                    {msg}
                </p>
            </div>
        </div>
    )
};

DocList.propTypes = {
    items: PropTypes.array.isRequired
};

const DocumentsList = connect(
    (state, ownProps) => {
        return {
            items: state.app.getIn(['docList', 'items']).toJS().filter((x) => typeof x === 'object')
        }
    },
    (dispatch, ownProps) => {
        return {
        }
    }
)(DocList);

export default DocumentsList