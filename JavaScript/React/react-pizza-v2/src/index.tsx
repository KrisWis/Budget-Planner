import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
} from "react-router-dom";
import "./index.css";
import App from './App';

import { store } from './redux/store';
import { Provider } from 'react-redux';

const root: HTMLElement = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);