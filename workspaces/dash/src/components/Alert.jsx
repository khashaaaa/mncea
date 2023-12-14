import { useContext, useEffect, useState } from "react"
import { AlertContext } from "../context/AlertProvider"
import { IconX } from "@tabler/icons-react"

export const Alert = ({ content, type }) => {
    const { isAlertOpen, closeAlert } = useContext(AlertContext)

    const [alertColor, setAlertColor] = useState("")

    useEffect(() => {
        if (type === "success") {
            setAlertColor("bg-green-600")
        } else if (type === "error") {
            setAlertColor("bg-red-600")
        } else {
            setAlertColor("bg-amber-600")
        }

        if (isAlertOpen) {
            const timeoutId = setTimeout(() => {
                closeAlert()
            }, 3000)

            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [isAlertOpen, closeAlert, type])

    return (
        <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 flex items-center rounded-xl px-4 py-2 ${alertColor}`}>
            <div className="ml-2"><p className="font-bold text-white">{content}</p></div>
            <IconX color="white" onClick={() => closeAlert()} className="ml-2 cursor-pointer" />
        </div>
    )
}
