import React from 'react';
import { Provider, connect } from 'react-redux'
import log from 'loglevel';

import DocList from './docList.jsx';
import DocDetails from './docDetails.jsx';
import Header from './header.jsx';
import {store} from '../store/store.js';

const Render = () => {

    return (
        <Provider store={store}>
            <div className="app">
            <div className="container header">
                <Header />
                <div className="row">
                    <div className="page-header">
                        <h1>Toporick &ETH;App <small>reference offchain entity in the blockchain</small></h1>
                    </div>
                </div>
            </div>

            <div className="container body">
                <DocDetails />
                <DocList />
            </div>

            <div className="container footer">
                <div className="row">
                    <div className="col-xs-6">
                        Toporick &ETH;App - reference offchain entity in the blockchain. MIT License
                    </div>
                    <div className="col-xs-6">
                        <a href="https://github.com/splix/toporick"><i className="fa fa-github"/> https://github.com/splix/toporick</a>
                    </div>
                </div>
            </div>
            </div>
        </Provider>
    )
};

export default Render;