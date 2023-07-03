import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import {Provider} from "react-redux";
import {I18nextProvider} from "react-i18next";
import {CssBaseline} from "@mui/material";

import i18n from "./global/i18n";
import {router} from "./router/routes";
import store from "./store/store";

import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <CssBaseline/>
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <RouterProvider router={router}/>
            </I18nextProvider>
        </Provider>
    </React.StrictMode>,
)
