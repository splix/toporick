import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import log from 'loglevel'
import Web3 from "web3"
import { createSignature } from '../store/signatures'

const web3 = new Web3();

const Render = ({fields: {type, sign}, handleSubmit, resetForm, submitting}) => {
    var input = {};
    var allValid = type.touched && !type.error && sign.touched && !sign.error;
    return (
        <div id="add-sign">
            <form className="form">
                <fieldset disabled={submitting}>
                <div className="row">
                    <div className="form-group col-sm-2">
                        <label className="">Type</label>
                    </div>
                    <div className="form-group col-sm-8">
                        <label className="">Sign (hex)</label>
                    </div>
                </div>
                <div className="row">
                    <div className={"form-group col-sm-2" + (type.touched && type.error ? " has-error" : "")}>
                        <input className="form-control" type="text"
                               ref={node => {input.type = node}}
                               {...type}/>
                        <span className="help-block">{type.touched && type.error && <div>{type.error}</div>}</span>
                    </div>
                    <div className={"form-group col-sm-7" + (sign.touched && sign.error ? " has-error" : "")}>
                        <textarea className="form-control" ref={node => {input.sign = node}} {...sign}/>
                        <span className="help-block">{sign.touched && sign.error && <div>{sign.error}</div>}</span>
                    </div>
                    <div className="form-group col-sm-3">
                        <div className="btn-group">
                            <button className="btn btn-primary"
                                    onClick={(e) => {e.preventDefault(); handleSubmit()}}>
                                <i className="fa fa-plus"/> Add Signature</button>
                            <button className="btn btn-default"
                                    onClick={(e) => {e.preventDefault(); resetForm()}}>
                                <i className="fa fa-trash"/> Reset</button>
                        </div>
                    </div>
                </div>
                </fieldset>
            </form>
        </div>
    )
};

var AddSign = connect(
    (state, ownProps) => {
        return {}
    },
    (dispatch, ownProps) => {
        return {}
    }
)(Render);

AddSign = reduxForm({
    form: 'addSignature',
    fields: ['type', 'sign'],
    // onSubmit: function(inputs, dispatch) {
    //     log.debug('onsubmit', arguments);
    //     var typeStr = inputs.type;
    //     var signStr = inputs.sign;
    //     var type = web3.fromAscii(typeStr, 16);
    //     var sign = '0x'+signStr; //'0x1245'; //[0x12, 0x45]; //web3.toBigNumber('0x' + signStr);
    //     log.debug('add signature', typeStr, type, signStr, sign);
    //     dispatch(createSignature(type, sign))
    // },
    validate: (values) => {
        const errors = {};
        if (!values.type) {
            errors.type = 'Required'
        } else if (values.type.length > 16) {
            errors.type = 'Must be 16 characters or less'
        }
        if (!values.sign) {
            errors.sign = 'Required'
        } else if (!/^(0x)?[a-fA-F0-9]+$/i.test(values.sign)) {
            errors.sign = 'Invalid HEX value'
        }
        return errors
    }
})(AddSign);

export default AddSign;