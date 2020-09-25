import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import './index.css';
import App from './App';
import Iphone8 from './iphone8';
import InfiniteLoaderExample from './react-virtualized/InfiniteLoader.example';
import ListExample from './react-virtualized/List.example';
import * as serviceWorker from './serviceWorker';
import VConsole from 'vconsole';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/i8" component={Iphone8} />
    <Route path="/list" component={ListExample} />
    <Route path="/inf" component={InfiniteLoaderExample} />
  </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

new VConsole();
