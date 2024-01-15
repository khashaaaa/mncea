import { useContext } from "react"
import { NotifContext } from "../context/NotifProvider"
import { Foot } from "../components/Foot"
import { Head } from "../components/Head"
import { Notif } from "../components/Notif"
import { Partnership } from "../components/Partnership"

export const MainLayout = ({ children }) => {

    const { isOpen, msg } = useContext(NotifContext)

    return (
        <div className="relative">
            {
                isOpen && <Notif msg={msg} />
            }
            <Head />
            {children}
            <Partnership />
            <Foot />
        </div>
    )
}