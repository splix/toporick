import React from 'react';
import { connect } from 'react-redux'
import log from 'loglevel';

import { showDocument } from '../store/show'
import { loadSignatures } from '../store/signatures'

const DocMini = ({doc, onSelect}) => {
    doc = doc || {idNumeric: '?'};
    return (
        <tr onClick={e => {e.preventDefault(); onSelect(doc)}}>
            <td>{doc.idNumeric}</td>
            <td>{doc.organizer}</td>
            <td>{doc.signsCount}</td>
        </tr>
    )
};

const DocumentsMini = connect(
    (state, ownProps) => {
        return {}
    },
    (dispatch, ownProps) => {
        return {
            onSelect: (doc) => {
                log.info('selected', doc);
                dispatch(showDocument(doc));
                dispatch(loadSignatures(doc))
            }
        }
    }
)(DocMini);

export default DocumentsMini
