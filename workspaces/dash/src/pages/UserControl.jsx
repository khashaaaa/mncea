import { useContext, useEffect, useState } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { base_url } from '../config/global'
import { ModalContext } from '../context/ModalProvider'
import { AlertContext } from "../context/AlertProvider"
import { useNavigate } from 'react-router-dom'
import { Modal } from "../components/Modal"
import { Alert } from "../components/Alert"
import { Button } from '../components/Button'
import Cookiez from 'js-cookie'
import { IconDatabase, IconEdit, IconTrash, IconUserCircle, IconUserPlus } from '@tabler/icons-react'
import admin from '/admin.png'
import moderator from '/moderator.png'
import { MenuContext } from '../context/MenuProvider'

export const UserControl = () => {

    const access_token = Cookiez.get('access_token')
    const str = Cookiez.get('user')
    const userJSON = str ? JSON.parse(str) : null

    const navigate = useNavigate()

    const { setActive } = useContext(MenuContext)
    const { isAlertOpen, openAlert } = useContext(AlertContext)
    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)

    const [currentUser, setCurrentUser] = useState({})
    const [userz, setUsers] = useState([])

    const [actionType, setActionType] = useState('')
    const [msg, setMsg] = useState(null)
    const [errType, setErrType] = useState('')
    const [del, setDel] = useState({})

    const [username, setUsername] = useState('')
    const [mobile, setMobile] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setActive('user')
        if (!access_token) {
            navigate('/login')
        }
        GetCurrentUser()
        GetUsers()
    }, [])

    const GetCurrentUser = async () => {
        const raw = await fetch(base_url + 'user/' + userJSON.mark)
        const resp = await raw.json()

        if (resp.ok) {
            setCurrentUser(resp.data)
        }
        else {
            console.error(resp.message)
        }
    }

    const GetUsers = async () => {
        const raw = await fetch(base_url + 'user')
        const resp = await raw.json()
        setUsers(resp)
    }

    const CreateUser = async () => {
        closeModal()

        const data = {
            username,
            mobile,
            password,
            role
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(data)
        }

        const raw = await fetch(base_url + 'user', options)
        const resp = await raw.json()

        setMsg(resp.message)
        openAlert()

        if (resp.ok) {
            GetCurrentUser()
            GetUsers()
            setErrType('success')
        }
        else {
            setErrType('error')
        }
    }

    const EditUser = async () => {
        closeModal()

        const data = {
            username,
            mobile,
            role
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(data)
        }

        const raw = await fetch(base_url + 'user/' + userJSON.mark, options)
        const resp = await raw.json()

        setMsg(resp.message)
        openAlert()

        if (resp.ok) {
            GetCurrentUser()
            GetUsers()
            setErrType('success')
        }
        else {
            setErrType('error')
        }
    }

    const DeleteUser = async () => {
        closeModal()

        const options = {
            method: 'DELETE'
        }

        const raw = await fetch(base_url + 'user/' + del.mark, options)
        const resp = await raw.json()

        setMsg(resp.message)
        openAlert()

        if (resp.ok) {
            GetCurrentUser()
            GetUsers()
            setErrType('success')
        }
        else {
            setErrType('error')
        }
    }

    const OptionMapper = () => {
        if (currentUser.role === 'admin') {
            return (
                <select onChange={(e) => setRole(e.target.value)} defaultValue={currentUser?.role} className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300 bg-white">
                    <option value={currentUser?.role}>{currentUser?.role}</option>
                    <option value="moderator">moderator</option>
                </select>
            )
        }
        if (currentUser.role === 'moderator') {
            return (
                <select onChange={(e) => setRole(e.target.value)} defaultValue={currentUser?.role} className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300 bg-white">
                    <option value={currentUser?.role}>{currentUser?.role}</option>
                    <option value="admin">admin</option>
                </select>
            )
        }
        if (!currentUser.role) {
            return (
                <select onChange={(e) => setRole(e.target.value)} className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300 bg-white">
                    <option>---сонгох---</option>
                    <option value="admin">admin</option>
                    <option value="moderator">moderator</option>
                </select>
            )
        }
    }

    const ModalContent = () => {

        if (actionType === 'create') {
            return (
                <div className="mt-8 w-72">
                    <div className="flex flex-col">
                        <label className="text-xs mb-1">Нэр</label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300" />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-xs mb-1">Утас</label>
                        <input onChange={(e) => setMobile(e.target.value)} type="text" className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300" />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-xs mb-1">Нууц үг</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="text" className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300" />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-xs mb-1">Эрх</label>
                        <select onChange={(e) => setRole(e.target.value)} className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300 bg-white">
                            <option>---сонгох---</option>
                            <option value="admin">admin</option>
                            <option value="moderator">moderator</option>
                        </select>
                    </div>
                    <div className="mt-4 flex justify-end items-center">
                        <Button click={CreateUser} text="Хадгалах" color="green" icon={<IconDatabase />} />
                    </div>
                </div>
            )
        }

        if (actionType === 'edit') {
            return (
                <div className="mt-8 w-72">
                    <div className="flex flex-col">
                        <label className="text-xs mb-1">Нэр</label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" defaultValue={currentUser?.username} className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300" />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-xs mb-1">Утас</label>
                        <input onChange={(e) => setMobile(e.target.value)} type="text" defaultValue={currentUser?.mobile} className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300" />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-xs mb-1">Нууц үг</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="text" defaultValue={currentUser?.password} className="outline-none border border-stone-200 px-2 py-1 rounded-md focus:ring ring-sky-300 duration-300" />
                    </div>
                    <div className="mt-4 flex flex-col">
                        <label className="text-xs mb-1">Эрх</label>
                        {OptionMapper()}
                    </div>
                    <div className="mt-4 flex justify-end items-center">
                        <Button click={EditUser} text="Хадгалах" color="green" icon={<IconDatabase />} />
                    </div>
                </div>
            )
        }

        if (actionType === 'delete') {
            return (
                <div className="mt-8 grid grid-rows-2 gap-4">
                    <p>Хэрэглэгчийг устгах уу?</p>
                    <div className="flex justify-between">
                        <Button click={DeleteUser} text="Тийм" color="green" />
                        <Button click={() => closeModal()} text="Үгүй" color="gray" />
                    </div>
                </div>
            )
        }
    }

    return (
        <MainLayout>
            {isAlertOpen && <Alert content={msg} type={errType} />}
            {isModalOpen && <Modal content={ModalContent()} />}
            <div>
                <Button click={() => { openModal(), setActionType('create') }} text="Хэрэглэгч нэмэх" color="green" icon={<IconUserPlus />} />
            </div>
            {
                userz.length > 0 ?
                    <div className="mt-4 border border-stone-200 rounded-lg w-fit">
                        <table className="text-sm">
                            <thead className="bg-stone-200">
                                <tr>
                                    <th className="p-2"><IconUserCircle /></th>
                                    <th className="p-2">Хэрэглэгчийн нэр</th>
                                    <th className="p-2">Утасны дугаар</th>
                                    <th className="p-2">Эрх</th>
                                    <th className="p-2">Үйлдэл</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userz.map((usr, num) => {
                                        return (
                                            <tr key={num}>
                                                <td className="p-2">{usr.avatar ? usr.avatar : <img src={usr.role === 'admin' ? admin : moderator} alt="avatar" className="w-6" />}</td>
                                                <td className="p-2">{usr.username}</td>
                                                <td className="p-2">{usr.mobile}</td>
                                                <td className="p-2">{usr.role}</td>
                                                <td className="p-2">
                                                    <div className="flex justify-evenly">
                                                        <IconEdit onClick={() => { openModal(), setActionType('edit') }} size={18} className="cursor-pointer" />
                                                        <IconTrash onClick={() => { openModal(), setDel(usr), setActionType('delete') }} size={18} className="cursor-pointer" />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    null
            }
        </MainLayout>
    )
}