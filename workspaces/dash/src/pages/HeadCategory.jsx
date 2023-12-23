import { Button } from "../components/Button"
import { MainLayout } from "../layouts/MainLayout"
import { ModalContext } from "../context/ModalProvider"
import { useContext, useState } from "react"
import { Modal } from "../components/Modal"
import { IconCategoryPlus } from "@tabler/icons-react"

export const HeadCategory = () => {

    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)

    const [type, setType] = useState('')

    const [name, setName] = useState('')

    const modalContent = () => {
        switch (type) {
            case 'create':
                return (
                    <div className="w-80 mt-8 grid grid-rows-2 gap-4">
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300"
                        />
                        <Button text="Болсон" color="green" />
                    </div>
                )
            case 'edit':
                return (
                    <div className="w-80 mt-8 grid grid-rows-2 gap-4">
                        <input
                            defaultValue={editData?.name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300"
                        />
                        <Button text="Болсон" color="green" />
                    </div>
                )
            case 'delete':
                return (
                    <div className="mt-8 grid grid-rows-2 gap-4">
                        <p>Мөрийг устгах уу?</p>
                        <div className="flex justify-between">
                            <Button text="Тийм" color="green" />
                            <Button onClick={() => closeModal()} text="Үгүй" color="gray" />
                        </div>
                    </div>
                )
            default:
                return null
        }
    }


    return (
        <MainLayout>
            {isModalOpen && <Modal content={modalContent()} />}
            <Button click={() => { setType('create'), openModal() }} icon={<IconCategoryPlus />} color="green" text="Нэмэх" />
        </MainLayout>
    )
}