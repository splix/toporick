import React from 'react';
import { connect } from 'react-redux'
import log from 'loglevel';

const Render = ({sign, signParts}) => {
    return (
        <tr>
            <td>{sign.type}</td>
            <td>{
                signParts.map((s) => <div className="sign-line">{s}</div>)
            }</td>
        </tr>
    )
};

const SignMini = connect(
    (state, ownProps) => {
        return {
            signParts: (ownProps.sign.sign || '0x00').substr(2).match(/.{1,64}/g) || []
        }
    },
    (dispatch, ownProps) => {
        return {}
    }
)(Render);


module.exports = SignMini;