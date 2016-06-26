import React from 'react';
import { Provider, connect } from 'react-redux'
import log from 'loglevel';

import DocDetails from './docDetails.jsx';
import CreateDoc from './createDocScreen.jsx';

const Render = ({screen}) => {

    var screenElement = null;
    if (screen === 'doc-details') {
        screenElement = <DocDetails/>;
    } else if (screen === 'create-doc') {
        screenElement = <CreateDoc/>;
    }

    return (
        <div>{screenElement}</div>
    )
};

const MainScreen = connect(
    (state, ownProps) => {
        return {
            screen: state.screen.get('screen')
        }
    },
    (dispatch, ownProps) => {
        return {}
    }
)(Render);

export default MainScreen;