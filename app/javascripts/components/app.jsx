import React from 'react';
import { Provider, connect } from 'react-redux'
import log from 'loglevel';

import DocList from './docList.jsx';
import DocDetails from './docDetails.jsx';
import {store} from '../store/store.js';

const Render = () => {

    return (
        <Provider store={store}>
            <div className="app">
                <DocDetails />
                <DocList />
            </div>
        </Provider>
    )
};

export default Render;