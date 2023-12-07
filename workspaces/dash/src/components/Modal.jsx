import { useContext } from "react"
import { ModalContext } from "../context/ModalProvider"
import { IconX } from "@tabler/icons-react"

export const Modal = ({ content }) => {

    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)

    return (
        <div>
            <div className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-30"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-4">
                <IconX onClick={() => closeModal()} className="cursor-pointer absolute right-2 top-2" />
                {content}
            </div>
        </div>

    )
}