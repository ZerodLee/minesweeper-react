import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const app = ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);
console.log(app);
