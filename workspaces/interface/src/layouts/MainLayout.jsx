import { useContext, useEffect, useState } from "react"
import { NotifContext } from "../context/NotifProvider"
import { Foot } from "../components/Foot"
import { Head } from "../components/Head"
import { Notif } from "../components/Notif"
import { Partnership } from "../components/Partnership"
import { ResponsiveContext } from "../context/ResponsiveProvider"

export const MainLayout = ({ children }) => {

    const { deviceSize } = useContext(ResponsiveContext)
    const { isOpen, msg } = useContext(NotifContext)

    const [margin, setMargin] = useState(null)

    useEffect(() => {
        let s
        switch (deviceSize) {
            case 'mobile':
                s = '0 1rem'
                break
            case 'tablet':
                s = '0 5%'
                break
            case 'smallMonitor':
                s = '0 10%'
                break
            default:
                s = '0 15%'
        }
        setMargin(s)
    }, [deviceSize])

    return (
        <div className="relative">
            {
                isOpen && <Notif msg={msg} />
            }
            <Head margin={margin} />
            {children}
            <Partnership margin={margin} deviceSize={deviceSize} />
            <Foot margin={margin} />
        </div>
    )
}