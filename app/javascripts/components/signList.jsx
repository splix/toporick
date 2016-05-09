import React from 'react';
import { connect } from 'react-redux'
import log from 'loglevel';

import SignMini from './signMini.jsx';
import AddSign from './addSign.jsx';

const Render = ({signatures, doc}) => {
    
    var table = <table className="table">
        <thead>
        <tr>
            <th>Type</th>
            <th>Signature</th>
        </tr>
        </thead>
        <tbody>
        {signatures.map( (sign) => {
            return <SignMini sign={sign} key={sign.id}/>;
        })}
        </tbody>
    </table>;
    return (
        <div className="row">
            <div className="col-md-12">
                <h2>Signatures</h2>
            </div>
            <div className="col-md-12">
                {table}
            </div>
            <div className="col-md-12">
                <AddSign doc={doc}/>
            </div>
        </div>
    )
};

const SignList = connect(
    (state, ownProps) => {
        return {
            signatures: state.app.get('signatures').get('items').toJS().filter(x => x !== null && typeof x === 'object'),
            doc: state.app.get('doc').get('document').toJS()
        }
    },
    (dispatch, ownProps) => {
        return {}
    }
)(Render);


export default SignList 