import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { TabButton } from "../components/TabButton"
import { base_url } from '../../environment/url'
import { IconComponents, IconEdit, IconTrash } from "@tabler/icons-react"
import { ModalContext } from "../context/ModalProvider"
import { AlertContext } from "../context/AlertProvider"
import { Button } from "../components/Button"
import { Alert } from "../components/Alert"
import { Modal } from "../components/Modal"
import Cookiez from 'js-cookie'
import { MenuContext } from "../context/MenuProvider"

export const SpecialCategory = () => {

    const access_token = Cookiez.get('access_token')

    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState(1)

    const [language, setLanguage] = useState('mn')

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

    const { setActive } = useContext(MenuContext)
    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)
    const { isAlertOpen, openAlert } = useContext(AlertContext)

    useEffect(() => {
        setActive('specialcategory')
        if (!access_token) {
            navigate('/login')
        }
        GetData()
    }, [language])

    const GetData = async () => {
        try {
            const [baseResp, midResp, subResp] = await Promise.all([
                fetch(`${base_url}/basecategory?language=${language}`),
                fetch(`${base_url}/midcategory?language=${language}`),
                fetch(`${base_url}/subcategory?language=${language}`),
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
            form = { name, language }
        }
        if (activeTab === 2) {
            endpoint = 'midcategory'
            form = {
                parent,
                name,
                language
            }
        }
        if (activeTab === 3) {
            endpoint = 'subcategory'
            form = {
                grandParent,
                parent,
                name,
                language
            }
        }

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(form)
        }

        const raw = await fetch(`${base_url}/${endpoint}`, options)
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

    const editCategory = async () => {
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
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(form)
        }

        const raw = await fetch(`${base_url}/${endpoint}/${editData.mark}`, options)
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
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }

        let endpoint
        if (activeTab === 1) {
            endpoint = 'basecategory'
        }
        if (activeTab === 2) {
            endpoint = 'midcategory'
        }
        if (activeTab === 3) {
            endpoint = 'subcategory'
        }

        const raw = await fetch(`${base_url}/${endpoint}/${del}`, options)
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
                    <div className="w-80 mt-8 grid grid-rows-3 gap-4">
                        <p>{language === 'mn' ? 'Хэл: Монгол' : 'Language: English'}</p>
                        <input onChange={(e) => setName(e.target.value)} className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300" />
                        <Button click={createCategory} text="Болсон" color="green" />
                    </div>
                )
            }
            if (type === 'edit') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-2 gap-4">
                        <input defaultValue={editData?.name} onChange={(e) => setName(e.target.value)} className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300" />
                        <Button click={editCategory} text="Болсон" color="green" />
                    </div>
                )
            }
            if (type === 'delete') {
                return (
                    <div className="mt-8 grid grid-rows-2 gap-4">
                        <p>Мөрийг устгах уу?</p>
                        <div className="flex justify-between">
                            <Button click={deleteCategory} text="Тийм" color="green" />
                            <Button click={() => closeModal()} text="Үгүй" color="gray" />
                        </div>
                    </div>
                )
            }
        }
        if (activeTab === 2) {
            if (type === 'create') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-4 gap-4">
                        <p>{language === 'mn' ? 'Хэл: Монгол' : 'Language: English'}</p>
                        <select onChange={(e) => setParent(e.target.value)} className="w-full bg-white outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300">
                            <option>---сонгох---</option>
                            {
                                baseCategories.map((cat, num) => <option key={cat.mark} value={cat.mark}>{cat.name}</option>)
                            }
                        </select>
                        <input onChange={(e) => setName(e.target.value)} className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300" />
                        <Button click={createCategory} text="Болсон" color="green" />
                    </div>
                )
            }
            if (type === 'edit') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-3 gap-4">
                        <select defaultValue={editData?.parent} onChange={(e) => setParent(e.target.value)} className="w-full bg-white outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300">
                            <option>---сонгох---</option>
                            {
                                baseCategories.map((cat, num) => <option key={cat.mark} value={cat.mark}>{cat.name}</option>)
                            }
                        </select>
                        <input defaultValue={editData?.name} onChange={(e) => setName(e.target.value)} className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300" />
                        <Button click={editCategory} text="Болсон" color="green" />
                    </div>
                )
            }
            if (type === 'delete') {
                return (
                    <div className="mt-8 grid grid-rows-2 gap-4">
                        <p>Мөрийг устгах уу?</p>
                        <div className="flex justify-between">
                            <Button click={deleteCategory} text="Тийм" color="green" />
                            <Button click={() => closeModal()} text="Үгүй" color="gray" />
                        </div>
                    </div>
                )
            }
        }
        if (activeTab === 3) {
            if (type === 'create') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-5 gap-4">
                        <p>{language === 'mn' ? 'Хэл: Монгол' : 'Language: English'}</p>
                        <select onChange={(e) => setGrandParent(e.target.value)} className="w-full bg-white outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300">
                            <option>---сонгох---</option>
                            {
                                baseCategories.map((cat, num) => <option key={cat.mark} value={cat.mark}>{cat.name}</option>)
                            }
                        </select>
                        <select onChange={(e) => setParent(e.target.value)} className="w-full bg-white outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300">
                            <option>---сонгох---</option>
                            {
                                midCategories.map((cat, num) => <option key={cat.mark} value={cat.mark}>{cat.name}</option>)
                            }
                        </select>
                        <input onChange={(e) => setName(e.target.value)} className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300" />
                        <Button click={createCategory} text="Болсон" color="green" />
                    </div>
                )
            }
            if (type === 'edit') {
                return (
                    <div className="w-80 mt-8 grid grid-rows-4 gap-4">
                        <select defaultValue={editData?.grandParent} onChange={(e) => setGrandParent(e.target.value)} className="w-full bg-white outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300">
                            <option>---сонгох---</option>
                            {
                                baseCategories.map((cat, num) => <option key={cat.mark} value={cat.mark}>{cat.name}</option>)
                            }
                        </select>
                        <select defaultValue={editData?.parent} onChange={(e) => setParent(e.target.value)} className="w-full bg-white outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300">
                            <option>---сонгох---</option>
                            {
                                midCategories.map((cat, num) => <option key={cat.mark} value={cat.mark}>{cat.name}</option>)
                            }
                        </select>
                        <input defaultValue={editData?.name} onChange={(e) => setName(e.target.value)} className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300" />
                        <Button click={editCategory} text="Болсон" color="green" />
                    </div>
                )
            }
            if (type === 'delete') {
                return (
                    <div className="mt-8 grid grid-rows-2 gap-4">
                        <p>Мөрийг устгах уу?</p>
                        <div className="flex justify-between">
                            <Button click={deleteCategory} text="Тийм" color="green" />
                            <Button click={() => closeModal()} text="Үгүй" color="gray" />
                        </div>
                    </div>
                )
            }
        }
    }

    const tableElement = (cats) => {

        return (
            <div className="border border-stone-200 rounded-lg">
                <table className="w-full text-sm">
                    <thead className="bg-stone-200">
                        <tr>
                            <th className="p-2 w-8">№</th>
                            <th className="p-2">Нэр</th>
                            <th className="p-2 w-16">Үйлдэл</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cats.map((cat, num) => (
                                <tr key={cat.mark}>
                                    <td className="p-2">{num + 1}</td>
                                    <td className="p-2">{cat.name}</td>
                                    <td className="p-2">
                                        <div className="flex justify-evenly">
                                            <IconEdit size={18} onClick={() => { setType('edit'), setEditData(cat), openModal() }} className="cursor-pointer" />
                                            <IconTrash size={18} onClick={() => { setType('delete'), setDel(cat.mark), openModal() }} className="cursor-pointer" />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <MainLayout>
            {isAlertOpen && <Alert content={msg} type={errType} />}
            {isModalOpen && <Modal content={modalContent()} />}
            <div className="flex">
                <div className="w-80 grid grid-cols-3">
                    <TabButton index={1} active={activeTab} setActive={setActiveTab} label="Үндсэн" />
                    <TabButton index={2} active={activeTab} setActive={setActiveTab} label="Дунд" />
                    <TabButton index={3} active={activeTab} setActive={setActiveTab} label="Дэд" />
                </div>
                <div className="ml-4 flex flex-col">
                    <select defaultValue={language} onChange={(e) => setLanguage(e.target.value)} className="h-8 bg-white outline-none border border-stone-200 py-1 px-2 rounded-md focus:ring ring-sky-300 duration-300">
                        <option value="mn">Монгол</option>
                        <option value="en">English</option>
                    </select>
                </div>
            </div>
            <div className="my-8">
                <Button click={() => { setEditData({}), setType('create'), openModal() }} text="Нэмэх" color="green" icon={<IconComponents />} />
            </div>
            {
                activeTab === 1 && baseCategories.length > 0 && tableElement(baseCategories)
                ||
                activeTab === 2 && midCategories.length > 0 && tableElement(midCategories)
                ||
                activeTab === 3 && subCategories.length > 0 && tableElement(subCategories)
            }
        </MainLayout>
    )
}
