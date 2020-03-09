import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import axios from "axios";
require("dotenv").config();
axios.interceptors.request.use(config => {
  config.baseURL = "http://api.openweathermap.org";
  config.params = config.params || {};
  config.params["appid"] = process.env.REACT_APP_SVITLANA_KEY;
  return config;
});

ReactDOM.render(<App />, document.getElementById("root"));
