import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { I18nextProvider, initReactI18next } from "react-i18next"
import i18next from "i18next"
import { resources } from "./language/resources.js"
import './global.scss'

i18next.use(initReactI18next)
  .init({
    resources,
    lng: "mn",
    interpolation: {
      escapeValue: false
    }
  })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
)
