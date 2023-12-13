import { useEffect, useState } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { base_url } from '../config/global'
import Cookiez from 'js-cookie'
import { IconEdit, IconTrash, IconUserCircle } from '@tabler/icons-react'
import admin from '/admin.png'
import moderator from '/moderator.png'

export const UserControl = () => {

    const str = Cookiez.get('user')
    const userJSON = str ? JSON.parse(str) : null

    const [userz, setUser] = useState([])

    useEffect(() => {
        GetUser()
    }, [])

    const GetUser = async () => {
        const raw = await fetch(base_url + 'user')
        const resp = await raw.json()
        setUser(resp)
    }

    return (
        <MainLayout>
            <div className="border border-stone-200 rounded-lg w-fit">
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
                                                <IconEdit size={18} className="cursor-pointer" />
                                                <IconTrash size={18} className="cursor-pointer" />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </MainLayout>
    )
}