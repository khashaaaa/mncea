import { IconX } from "@tabler/icons-react"
import { useContext } from "react"
import { NotifContext } from "../context/NotifProvider"

export const Notif = ({ msg }) => {

    const { Cloze } = useContext(NotifContext)

    return (
        <div className="absolute bottom-20 right-20 bg-amber-600 z-10 rounded-md px-4 py-2 shadow flex">
            <p className="mr-4">{msg}</p>
            <IconX className="cursor-pointer" onClick={() => Cloze()} />
        </div>
    )
}