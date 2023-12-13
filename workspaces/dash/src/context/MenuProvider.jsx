import { createContext, useState } from 'react'

export const MenuContext = createContext()

export const MenuProvider = ({ children }) => {

    const [menuOpen, setMenuOpen] = useState(1)

    const setActive = (num) => {
        setMenuOpen(num)
    }

    return (
        <MenuContext.Provider value={{ menuOpen, setActive }}>
            {children}
        </MenuContext.Provider>
    )
}
