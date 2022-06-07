import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import history from "./history";
import store from "./store";
import App from "./App";
import { theme } from "./siteTheme";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("app")
);
