import { createContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('mn')
    const { i18n } = useTranslation()

    const switchLanguage = (lang) => {
        setLanguage(lang)
        i18n.changeLanguage(lang)
    }

    return (
        <LanguageContext.Provider value={{ language, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}