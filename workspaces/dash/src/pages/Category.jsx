import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { TabButton } from "../components/TabButton"
import { base_url } from '../config/global'
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { ModalContext } from "../context/ModalProvider"
import { AlertContext } from "../context/AlertProvider"
import { Button } from "../components/Button"
import { Alert } from "../components/Alert"
import { Modal } from "../components/Modal"
import Cookiez from 'js-cookie'

export const Category = () => {

    const access_token = Cookiez.get('access_token')

    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState(1)

    const [type, setType] = useState('')

    const [baseCategories, setBaseCategories] = useState([])
    const [midCategories, setMidCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    const [grandParent, setGrandParent] = useState(null)
    const [parent, setParent] = useState(null)
    const [name, setName] = useState(null)

    const [editData, setEditData] = useState({})

    const [del, setDel] = useState(null)

    const [msg, setMsg] = useState(null)
    const [errType, setErrType] = useState('')

    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)
    const { isAlertOpen, openAlert, closeAlert } = useContext(AlertContext)

    useEffect(() => {
        if (!access_token) {
            navigate('/login')
        }
        GetData()
    }, [])

    const GetData = async () => {
        try {
            const [baseResp, midResp, subResp] = await Promise.all([
                fetch(base_url + "basecategory"),
                fetch(base_url + "midcategory"),
                fetch(base_url + "subcategory"),
            ])

            const baseData = await baseResp.json()
            const midData = await midResp.json()
            const subData = await subResp.json()

            setBaseCategories(baseData)
            setMidCategories(midData)
            setSubCategories(subData)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const createCategory = async () => {
        closeModal()

        let endpoint
        let form

        if (activeTab === 1) {
            endpoint = 'basecategory'
            form = { name }
        }
        if (activeTab === 2) {
            endpoint = 'midcategory'
            form = {
                parent,
                name
            }
        }
        if (activeTab === 3) {
            endpoint = 'subcategory'
            form = {
                grandParent,
                parent,
                name
            }
        }

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        }

        const raw = await fetch(base_url + endpoint, options)
        const resp = await raw.json()

        if (resp.ok) {
            GetData()
        }
        else {
            setErrType('error')
            setMsg(resp.message)
            openAlert()
        }
    }

    const editCategory = async (category) => {
        closeModal()

        let endpoint
        let form

        if (activeTab === 1) {
            endpoint = 'basecategory'
            form = { name }
        }
        if (activeTab === 2) {
            endpoint = 'midcategory'
            form = {
                parent,
                name
            }
        }
        if (activeTab === 3) {
            endpoint = 'subcategory'
            form = {
                grandParent,
                parent,
                name
            }
        }

        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        }

        const raw = await fetch(base_url + endpoint + category.mark, options)
        const resp = await raw.json()

        if (resp.ok) {
            GetData()
        }
        else {
            setErrType('error')
            setMsg(resp.message)
            openAlert()
        }
    }

    const deleteCategory = async () => {
        closeModal()

        const options = {
            method: 'DELETE'
        }

        let endpoint
        if (activeTab === 1) {
            endpoint = 'basecategory/'
        }
        if (activeTab === 2) {
            endpoint = 'midcategory/'
        }
        if (activeTab === 3) {
            endpoint = 'subcategory/'
        }

        const raw = await fetch(base_url + endpoint + del, options)
        const resp = await raw.json()

        if (resp.ok) {
            GetData()
        }
        else {
            setErrType('error')
            setMsg(resp.message)
            openAlert()
        }
    }

    const modalContent = () => {

        if (activeTab === 1) {
            if (type === 'create') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-2 gap-4">
                        <input onChange={(e) => setName(e.target.value)} className="w-full outline-none border border-stone-200 rounded-md py-1 px-2" />
                        <Button click={createCategory} text="Болсон" color="green" />
                    </div>
                )
            }
            if (type === 'edit') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-2 gap-4">
                        <input value={editData?.name} onChange={(e) => setName(e.target.value)} className="w-full outline-none border border-stone-200 rounded-md py-1 px-2" />
                        <Button click={editCategory} text="Болсон" color="green" />
                    </div>
                )
            }
            if (type === 'delete') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-2 gap-4">
                        <p>Мөрийг устгах уу?</p>
                        <Button click={deleteCategory} text="Болсон" color="green" />
                    </div>
                )
            }
        }
        if (activeTab === 2) {
            if (type === 'create') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-3 gap-4">
                        <select onChange={(e) => setParent(e.target.value)} className="w-full bg-white outline-none border border-stone-200 rounded-md py-1 px-2">
                            <option>---сонгох---</option>
                            {
                                baseCategories.map((cat, num) => <option key={cat.mark} value={cat.mark}>{cat.name}</option>)
                            }
                        </select>
                        <input onChange={(e) => setName(e.target.value)} className="w-full outline-none border border-stone-200 rounded-md py-1 px-2" />
                        <Button click={createCategory} text="Болсон" color="green" />
                    </div>
                )
            }
            if (type === 'edit') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-3 gap-4">
                        <select value={editData?.parent} onChange={(e) => setParent(e.target.value)} className="w-full bg-white outline-none border border-stone-200 rounded-md py-1 px-2">
                            <option>---сонгох---</option>
                            {
                                baseCategories.map((cat, num) => <option key={cat.mark} value={cat.mark}>{cat.name}</option>)
                            }
                        </select>
                        <input value={editData?.name} onChange={(e) => setName(e.target.value)} className="w-full outline-none border border-stone-200 rounded-md py-1 px-2" />
                        <Button click={editCategory} text="Болсон" color="green" />
                    </div>
                )
            }
            if (type === 'delete') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-2 gap-4">
                        <p>Мөрийг устгах уу?</p>
                        <Button click={deleteCategory} text="Болсон" color="green" />
                    </div>
                )
            }
        }
        if (activeTab === 3) {
            if (type === 'create') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-4 gap-4">
                        <select onChange={(e) => setGrandParent(e.target.value)} className="w-full bg-white outline-none border border-stone-200 rounded-md py-1 px-2">
                            <option>---сонгох---</option>
                            {
                                baseCategories.map((cat, num) => <option key={cat.mark} value={cat.mark}>{cat.name}</option>)
                            }
                        </select>
                        <select onChange={(e) => setParent(e.target.value)} className="w-full bg-white outline-none border border-stone-200 rounded-md py-1 px-2">
                            <option>---сонгох---</option>
                            {
                                midCategories.map((cat, num) => <option key={cat.mark} value={cat.mark}>{cat.name}</option>)
                            }
                        </select>
                        <input onChange={(e) => setName(e.target.value)} className="w-full outline-none border border-stone-200 rounded-md py-1 px-2" />
                        <Button click={createCategory} text="Болсон" color="green" />
                    </div>
                )
            }
            if (type === 'edit') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-4 gap-4">
                        <select value={editData?.grandParent} onChange={(e) => setGrandParent(e.target.value)} className="w-full bg-white outline-none border border-stone-200 rounded-md py-1 px-2">
                            <option>---сонгох---</option>
                            {
                                baseCategories.map((cat, num) => <option key={cat.mark} value={cat.mark}>{cat.name}</option>)
                            }
                        </select>
                        <select value={editData?.parent} onChange={(e) => setParent(e.target.value)} className="w-full bg-white outline-none border border-stone-200 rounded-md py-1 px-2">
                            <option>---сонгох---</option>
                            {
                                midCategories.map((cat, num) => <option key={cat.mark} value={cat.mark}>{cat.name}</option>)
                            }
                        </select>
                        <input value={editData?.name} onChange={(e) => setName(e.target.value)} className="w-full outline-none border border-stone-200 rounded-md py-1 px-2" />
                        <Button click={editCategory} text="Болсон" color="green" />
                    </div>
                )
            }
            if (type === 'delete') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-2 gap-4">
                        <p>Мөрийг устгах уу?</p>
                        <Button click={deleteCategory} text="Болсон" color="green" />
                    </div>
                )
            }
        }
    }

    const tableElement = (cats) => {

        return (
            <table className="w-full border-collapse border border-stone-200 text-sm">
                <thead>
                    <tr>
                        <th className="border border-stone-200 w-8">№</th>
                        <th className="border border-stone-200">Нэр</th>
                        <th className="border border-stone-200 w-16">Үйлдэл</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cats.map((cat, num) => (
                            <tr key={cat.mark}>
                                <td className="border border-stone-200">{num + 1}</td>
                                <td className="border border-stone-200">{cat.name}</td>
                                <td className="border border-stone-200">
                                    <div className="flex justify-evenly">
                                        <IconEdit onClick={() => { setType('edit'), setEditData(cat), openModal() }} className="cursor-pointer" />
                                        <IconTrash onClick={() => { setType('delete'), setDel(cat.mark), openModal() }} className="cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }

    return (
        <MainLayout>
            {isAlertOpen && <Alert content={msg} type={errType} />}
            {isModalOpen && <Modal content={modalContent()} />}
            <div className="grid grid-cols-3">
                <TabButton index={1} active={activeTab} setActive={setActiveTab} label="Үндсэн цэс" />
                <TabButton index={2} active={activeTab} setActive={setActiveTab} label="Дунд цэс" />
                <TabButton index={3} active={activeTab} setActive={setActiveTab} label="Дэд цэс" />
            </div>
            <div className="my-4">
                <Button click={() => { setEditData({}), setType('create'), openModal() }} text="Нэмэх" color="green" />
            </div>
            {
                activeTab === 1 && tableElement(baseCategories)
                ||
                activeTab === 2 && tableElement(midCategories)
                ||
                activeTab === 3 && tableElement(subCategories)
            }
        </MainLayout>
    )
}
