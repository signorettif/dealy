import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './styles/main.scss';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const theme = createMuiTheme({
  palette: {
    primary: {
       main: '#FE6B8B',
       contrastText: 'white'
    }
  }
});

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme = { theme }>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
