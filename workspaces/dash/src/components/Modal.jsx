import React, { useContext, useEffect } from "react"
import { ModalContext } from "../context/ModalProvider"
import { IconX } from "@tabler/icons-react"

export const Modal = ({ content }) => {
    const { isModalOpen, closeModal } = useContext(ModalContext)

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                closeModal()
            }
        }

        const handleOverlayClick = (event) => {
            if (event.target.classList.contains("modal-overlay")) {
                closeModal()
            }
        }

        if (isModalOpen) {
            window.addEventListener("keydown", handleKeyDown)
            window.addEventListener("mousedown", handleOverlayClick)
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("mousedown", handleOverlayClick)
        }
    }, [isModalOpen, closeModal])

    return (
        <div>
            <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-500 opacity-50 modal-overlay"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-4">
                <IconX onClick={() => closeModal()} className="cursor-pointer absolute right-2 top-2" />
                {content}
            </div>
        </div>
    )
}
