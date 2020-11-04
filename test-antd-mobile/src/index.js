import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import './index.css';
import App from './App';
import Buttons from './pages/Buttons';
import Icons from './pages/Icons';
import Switchs from './pages/Switchs';
import Modals from './pages/Modals';
import reportWebVitals from './reportWebVitals';
import 'antd-mobile/dist/antd-mobile.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/buttons" component={Buttons} />
    <Route path="/icons" component={Icons} />
    <Route path="/switchs" component={Switchs} />
    <Route path="/modals" component={Modals} />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
