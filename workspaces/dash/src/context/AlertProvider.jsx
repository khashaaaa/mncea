import { createContext, useState } from 'react'

export const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    const openAlert = () => {
        setIsAlertOpen(true)
    }

    const closeAlert = () => {
        setIsAlertOpen(false)
    }

    return (
        <AlertContext.Provider value={{ isAlertOpen, openAlert, closeAlert }}>
            {children}
        </AlertContext.Provider>
    )
}
