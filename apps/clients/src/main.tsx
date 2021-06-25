import * as ReactDOM from 'react-dom';
import React from 'react';
import App from './app/app';
import {store} from './redux/store'
import { Provider } from 'react-redux'
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
// @ts-ignore
import en from "./assets/translations/en.json";
// @ts-ignore
import vi from "./assets/translations/vi.json";

const { PUBLIC_URL } = process.env;

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'vi',
  resources: {
    en: {
      common: en               // 'common' is our custom namespace
    },
    vi: {
      common: vi               // 'common' is our custom namespace
    }
  }
});

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      <React.Suspense fallback={<div>Loading...</div>}>
      <App basename={PUBLIC_URL}/>
      </React.Suspense>
    </Provider>
  </I18nextProvider>,
  document.getElementById("root")
);

