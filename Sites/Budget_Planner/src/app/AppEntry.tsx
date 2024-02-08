import React from 'react';
import ReactDOM from 'react-dom/client';
import '../shared/index.css';
import { App } from './layouts/BaseLayout';
import { Provider } from 'react-redux';
import { store } from './AppStore';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);
