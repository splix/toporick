import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import log from 'loglevel';

import DocMini from './docMini.jsx';

const DocList = ({items, onCreate}) => {

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
                <h1>Latest Documents</h1>
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
        }
    }
)(DocList);

export default DocumentsList