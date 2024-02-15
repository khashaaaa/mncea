import { useContext, useEffect, useState } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { MenuContext } from '../context/MenuProvider'
import { base_url } from '../../environment/url'
import { useNavigate } from 'react-router-dom'
import Cookiez from 'js-cookie'
import { IconEye, IconTrash } from '@tabler/icons-react'
import { ModalContext } from '../context/ModalProvider'
import { Modal } from "../components/Modal"
import { Button } from '../components/Button'

export const CompliantList = () => {

    const access_token = Cookiez.get('access_token')
    const str = Cookiez.get('user')
    const user = str ? JSON.parse(str) : null

    const navigate = useNavigate()

    const { setActive } = useContext(MenuContext)
    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)

    const [actionType, setActionType] = useState('')

    const [compliant, setCompliant] = useState(null)
    const [del, setDel] = useState({})

    const [compliants, setCompliants] = useState([])

    useEffect(() => {
        setActive('compliant')
        if (!access_token) {
            navigate('/login')
        }
        FetchCompliants()
    }, [compliants])

    const FetchCompliants = async () => {

        const raw = await fetch(`${base_url}/compliant`)
        const resp = await raw.json()
        setCompliants(resp.data)
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        return date.toISOString().slice(0, 16).replace('T', ' ')
    }

    const formatType = (type) => {

        switch (type) {
            case 'suggestion':
                return 'санал'
            case 'application':
                return 'өргөдөл'
            case 'compliant':
                return 'гомдол'
            default: null
        }
    }

    const DeleteUser = async () => {
        closeModal()

        const options = {
            method: 'DELETE'
        }

        const raw = await fetch(`${base_url}/compliant/` + del.mark, options)
        const resp = await raw.json()

        if (resp.ok) {
            FetchCompliants()
        }
    }

    const ModalContent = () => {

        if (actionType === 'show') {
            return (
                <div className="mt-8 w-96">
                    <div className="border rounded-md p-2">{compliant.statement}</div>
                    <div className="mt-4">
                        <p>Нэр: {compliant.user}</p>
                        <p>Төрөл: {formatType(compliant.type)}</p>
                        <p>Имэйл: {compliant.email}</p>
                        <p>Утас: {compliant.mobile}</p>
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
            {isModalOpen && <Modal content={ModalContent()} />}
            {
                compliants.length > 0 &&
                <div className="border border-stone-200 rounded-lg w-fit">
                    <table className="text-sm">
                        <thead className="bg-stone-200">
                            <tr>
                                <th className='px-4 py-2'>Нэр</th>
                                <th className='px-4 py-2'>Утас</th>
                                <th className='px-4 py-2'>Имэйл</th>
                                <th className='px-4 py-2'>Төрөл</th>
                                <th className='px-4 py-2'>Хүсэлт</th>
                                <th className='px-4 py-2'>Огноо</th>
                                <th className='px-4 py-2'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                compliants.map((comp) => (
                                    <tr key={comp.mark}>
                                        <td className='px-4 py-2'>{comp.user}</td>
                                        <td className='px-4 py-2'>{comp.mobile}</td>
                                        <td className='px-4 py-2'>{comp.email}</td>
                                        <td className='px-4 py-2'>{formatType(comp.type)}</td>
                                        <td className='px-4 py-2 overflow-hidden truncate' style={{ maxWidth: '600px' }}>{comp.statement}</td>
                                        <td className='px-4 py-2'>{formatTimestamp(comp.created)}</td>
                                        <td className='px-4 py-2'>
                                            <div className="flex justify-between w-12">
                                                <IconEye onClick={() => { openModal(), setCompliant(comp), setActionType('show') }} className="cursor-pointer" size={20} />
                                                <IconTrash onClick={() => { openModal(), setDel(comp), setActionType('delete') }} className="cursor-pointer" size={20} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </MainLayout>
    )
}