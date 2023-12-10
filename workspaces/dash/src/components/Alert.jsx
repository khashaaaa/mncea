import { useContext, useEffect, useState } from "react"
import { AlertContext } from "../context/AlertProvider"
import { IconX } from "@tabler/icons-react"

export const Alert = ({ content, type }) => {
    const { isAlertOpen, closeAlert } = useContext(AlertContext)

    const [alertColor, setAlertColor] = useState("")

    useEffect(() => {
        if (type === "success") {
            setAlertColor("bg-green-400")
        } else if (type === "error") {
            setAlertColor("bg-red-400")
        } else {
            setAlertColor("bg-amber-400")
        }
    }, [isAlertOpen, closeAlert, type])

    return (
        <div className={`fixed top-16 left-1/2 transform -translate-x-1/2 flex items-center rounded-xl p-4 ${alertColor}`}>
            <div className="ml-2"><p>{content}</p></div>
            <IconX onClick={() => closeAlert()} className="ml-2 cursor-pointer" />
        </div>
    )
}
