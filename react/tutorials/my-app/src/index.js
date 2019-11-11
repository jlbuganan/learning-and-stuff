import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import Name from './Name';

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// function tick() {
//   const time = new Date().toLocaleTimeString();
//   ReactDOM.render(<Name time={time} />, document.querySelector('#userName'));
// }
// setInterval(tick, 1000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
