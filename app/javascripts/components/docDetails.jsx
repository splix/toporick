import React from 'react';
import { connect } from 'react-redux'
import log from 'loglevel';

import SignList from './signList.jsx';

const Render = ({doc}) => {

    if (typeof doc === 'undefined' || doc === null) {
        return <div/>
    }

    return (
        <div id="document-details">
            <div className="row">
                <dl className="dl-horizontal">
                    <dt>ID</dt>
                    <dd>{doc.id.toNumber()}</dd>
                </dl>
            </div>
            <SignList />
            <div className="row">
            </div>
        </div>
    )
};

const DocDetails = connect(
    (state, ownProps) => {
        return {
            doc: state.app.getIn(['doc', 'document']) != null ? state.app.get('doc').get('document').toJS() : null
        }
    },
    (dispatch, ownProps) => {
        return {}
    }
)(Render);

export default DocDetails;