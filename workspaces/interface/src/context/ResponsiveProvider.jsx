import { createContext, useEffect, useState } from "react"

export const ResponsiveContext = createContext()

export const ResponsiveProvider = ({ children }) => {

    const [deviceSize, setDeviceSize] = useState('desktop')

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth

            if (width < 768) {
                setDeviceSize('mobile')
            }
            else if (width >= 768 && width < 1366) {
                setDeviceSize('tablet')
            }
            else if (width >= 1366 && width < 1680) {
                setDeviceSize('smallMonitor')
            }
            else if (width >= 1680) {
                setDeviceSize('largeMonitor')
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <ResponsiveContext.Provider value={{ deviceSize }}>
            {children}
        </ResponsiveContext.Provider>
    )
}