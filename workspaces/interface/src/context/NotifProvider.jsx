import { createContext, useState } from "react"

export const NotifContext = createContext()

export const NotifProvider = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [msg, setMsg] = useState('')

    const Open = () => {
        setIsOpen(true)
    }

    const Cloze = () => {
        setIsOpen(false)
    }

    return (
        <NotifContext.Provider value={{ isOpen, Open, Cloze, msg, setMsg }}>
            {children}
        </NotifContext.Provider>
    )
}