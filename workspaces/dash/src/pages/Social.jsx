import { useContext, useEffect, useState } from "react"
import { MenuContext } from "../context/MenuProvider"
import { MainLayout } from "../layouts/MainLayout"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Modal } from "../components/Modal"
import { IconLinkPlus, IconTrash } from "@tabler/icons-react"
import Cookiez from 'js-cookie'
import { ModalContext } from "../context/ModalProvider"
import { AlertContext } from '../context/AlertProvider'
import { base_url } from '../../environment/url'

export const Social = () => {

    const access_token = Cookiez.get('access_token')
    const str = Cookiez.get('user')
    const user = str ? JSON.parse(str) : null

    const navigate = useNavigate()

    const { setActive } = useContext(MenuContext)

    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)
    const { isAlertOpen, openAlert, closeAlert } = useContext(AlertContext)

    const [msg, setMsg] = useState(null)
    const [errType, setErrType] = useState('')

    const [socials, setSocials] = useState([])

    const [actionType, setActionType] = useState('')

    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    useEffect(() => {
        setActive('social')
        if (!access_token) {
            navigate('/login')
        }
        FetchSocials()
    }, [])

    const FetchSocials = async () => {

        const raw = await fetch(`${base_url}/social`)
        const resp = await raw.json()

        setSocials(resp.data)
    }

    const CreateSocial = async () => {
        closeModal()

        if (!name) {
            setMsg('Нэр оруулна уу')
            setErrType('error')
            return
        }
        if (!link) {
            setMsg('Линк оруулна уу')
            setErrType('error')
            return
        }

        const data = {
            name,
            link
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(data)
        }

        const raw = await fetch(`${base_url}/social`, options)
        const resp = await raw.json()

        if (resp.ok) {
            FetchSocials()
        }
        else {
            console.log(resp.message)
        }
    }

    const ModalContent = () => {

        if (actionType === 'create') {
            return (
                <div className="mt-8 w-72">
                    <div className="flex flex-col">
                        <label className="text-xs mb-1">Сошл нэр</label>
                        <select onChange={(e) => setName(e.target.value)} className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300 bg-white">
                            <option>---сонгох---</option>
                            <option value="facebook">facebook</option>
                            <option value="instagram">instagram</option>
                            <option value="youtube">youtube</option>
                            <option value="twitter">twitter</option>
                            <option value="linkedin">linkedin</option>
                        </select>
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-xs mb-1">Вэб холбоос</label>
                        <input onChange={(e) => setLink(e.target.value)} type="text" className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300" />
                    </div>
                    <div className="mt-4 flex justify-end items-center">
                        <Button click={CreateSocial} text="Хадгалах" color="green" />
                    </div>
                </div>
            )
        }

        if (actionType === 'edit') {
            return (
                <div className="mt-8 w-72">
                    <div className="mt-4 flex flex-col">
                        <label className="text-xs mb-1">Сошл нэр</label>
                        <select className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300 bg-white">
                            <option>---сонгох---</option>
                            <option value="facebook">facebook</option>
                            <option value="instagram">instagram</option>
                            <option value="youtube">youtube</option>
                            <option value="twitter">twitter</option>
                            <option value="linkedin">linkedin</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs mb-1">Вэб холбоос</label>
                        <input type="text" className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300" />
                    </div>
                    <div className="mt-4 flex justify-end items-center">
                        <Button text="Хадгалах" color="green" />
                    </div>
                </div>
            )
        }

        if (actionType === 'delete') {
            return (
                <div className="mt-8 grid grid-rows-2 gap-4">
                    <p>Мөрийг устгах уу?</p>
                    <div className="flex justify-between">
                        <Button text="Тийм" color="green" />
                        <Button click={() => closeModal()} text="Үгүй" color="gray" />
                    </div>
                </div>
            )
        }
    }

    return (
        <MainLayout>
            {isModalOpen && <Modal content={ModalContent()} />}
            <div>
                <Button click={() => { openModal(), setActionType('create') }} color="green" text="Нэмэх" icon={<IconLinkPlus />} />
            </div>
            {
                socials.length > 0 &&
                <table className="mt-4 border-collapse border">
                    <thead>
                        <tr>
                            <th className="border p-2">Нэр</th>
                            <th className="border p-2">Линк</th>
                            <th className="border p-2">Үйлдэл</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            socials.map((item) => (
                                <tr key={item.mark}>
                                    <td className="border p-2">{item.name}</td>
                                    <td className="border p-2">{item.link}</td>
                                    <td className="border p-2">
                                        <div className="flex justify-center"><IconTrash size={18} className="cursor-pointer" /></div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </MainLayout>
    )
}