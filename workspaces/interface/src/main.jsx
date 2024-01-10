import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { I18nextProvider, initReactI18next } from "react-i18next"
import i18next from "i18next"
import { resources } from "./language/resources.js"
import './global.scss'
import { LanguageProvider } from './context/LanguageProvider.jsx'
import { NotifProvider } from './context/NotifProvider.jsx'

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
    <NotifProvider>
      <I18nextProvider i18n={i18next}>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </I18nextProvider>
    </NotifProvider>
  </React.StrictMode>
)
