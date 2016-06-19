import 'bootstrap/less/bootstrap.less';
import 'font-awesome/less/font-awesome.less';

import '../stylesheets/main.scss';
import '../stylesheets/header.scss';

import React from 'react';
import ReactDom from 'react-dom';
import log from 'loglevel';

import App from './components/app.jsx';

window.onload = function() {
  log.setLevel("trace");
  ReactDom.render(React.createElement(App), document.getElementById('app'));
};
