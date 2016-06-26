import React from 'react';
import { connect } from 'react-redux'
import log from 'loglevel';

import { showDocument } from '../store/show'
import { loadSignatures } from '../store/signatures'
import { showScreen } from '../store/screens'

const DocMini = ({doc, onSelect}) => {
    return (
        <tr onClick={e => {e.preventDefault(); onSelect(doc)}}>
            <td>{doc.index}</td>
            <td>{doc.idHex}</td>
            <td>{doc.organizer}</td>
            <td>{doc.signsCount}</td>
        </tr>
    )
};

const DocumentsMini = connect(
    (state, ownProps) => {
        return {
            doc: ownProps.doc || {idHex: '0x0000', signsCount: 0}
        }
    },
    (dispatch, ownProps) => {
        return {
            onSelect: (doc) => {
                log.info('selected', doc);
                dispatch(showScreen('doc-details'));
                dispatch(showDocument(doc));
                dispatch(loadSignatures(doc))
            }
        }
    }
)(DocMini);

export default DocumentsMini
