import { Button } from "../components/Button"
import { MainLayout } from "../layouts/MainLayout"
import { ModalContext } from "../context/ModalProvider"
import { useContext, useEffect, useState } from "react"
import { Modal } from "../components/Modal"
import { IconCategoryPlus, IconEdit, IconTrash } from "@tabler/icons-react"
import { base_url } from "../../environment/url"
import { AlertContext } from "../context/AlertProvider"
import { Alert } from "../components/Alert"
import Cookiez from 'js-cookie'
import { MenuContext } from "../context/MenuProvider"
import { useNavigate } from "react-router-dom"

export const HeadCategory = () => {

    const navigate = useNavigate()

    const access_token = Cookiez.get('access_token')

    const { setActive } = useContext(MenuContext)
    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)
    const { isAlertOpen, openAlert } = useContext(AlertContext)

    const [msg, setMsg] = useState(null)
    const [errType, setErrType] = useState('')

    const [type, setType] = useState('')

    const [categories, setCategories] = useState([])
    const [del, setDel] = useState(null)

    const [mn, setmn] = useState('')
    const [en, seten] = useState('')
    const [keyword, setKeyword] = useState('')
    const [sub, setSub] = useState([])

    useEffect(() => {
        setActive('headcategory')
        if (!access_token) {
            navigate('/login')
        }
        FetchHeadCategories()
    }, [])

    const FetchHeadCategories = async () => {
        const raw = await fetch(`${base_url}/headcategory`)
        const resp = await raw.json()
        setCategories(resp.data)
    }

    const CreateCategory = async () => {
        closeModal()

        const formdata = { mn, en, keyword, children: sub }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`
            },
            body: JSON.stringify(formdata)
        }

        const raw = await fetch(`${base_url}/headcategory`, options)
        const resp = await raw.json()

        if (resp.ok) {
            FetchHeadCategories()
        }
        else {
            setErrType('error')
            setMsg(resp.message)
            openAlert()
        }
    }

    const DeleteCategory = async () => {
        closeModal()

        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }

        const raw = await fetch(`${base_url}/headcategory/${del}`, options)
        const resp = await raw.json()

        if (resp.ok) {
            FetchHeadCategories()
        }
        else {
            setErrType('error')
            setMsg(resp.message)
            openAlert()
        }
    }

    const IncrementSub = () => {
        setSub([...sub, { mn: '', en: '', keyword: '' }])
    }

    const DecrementSub = () => {
        if (sub.length > 0) {
            const newInputs = [...sub]
            newInputs.pop()
            setSub(newInputs)
        }
    }

    const modalContent = () => {
        switch (type) {
            case 'create':
                return (
                    <div className="mt-8">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="text-xs">Монгол нэр</label>
                                <input
                                    onChange={(e) => setmn(e.target.value)}
                                    className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300"
                                />
                            </div>
                            <div>
                                <label className="text-xs">Англи нэр</label>
                                <input
                                    onChange={(e) => seten(e.target.value)}
                                    className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300"
                                />
                            </div>
                            <div>
                                <label className="text-xs">Түлхүүр үг</label>
                                <input
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300"
                                />
                            </div>
                        </div>

                        <p className="mt-4 text-center">Дэд цэс</p>
                        {
                            sub?.length > 0 &&
                            sub.map((item, num) => (
                                <div key={num} className="mt-4 grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="text-xs">Монгол нэр</label>
                                        <input
                                            value={item.mn}
                                            onChange={(e) => {
                                                const newInputs = [...sub]
                                                newInputs[num].mn = e.target.value
                                                setSub(newInputs)
                                            }}
                                            className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs">Англи нэр</label>
                                        <input
                                            value={item.en}
                                            onChange={(e) => {
                                                const newInputs = [...sub]
                                                newInputs[num].en = e.target.value
                                                setSub(newInputs)
                                            }}
                                            className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs">Түлхүүр үг</label>
                                        <input
                                            value={item.keyword}
                                            onChange={(e) => {
                                                const newInputs = [...sub]
                                                newInputs[num].keyword = e.target.value
                                                setSub(newInputs)
                                            }}
                                            className="w-full outline-none border border-stone-200 rounded-md py-1 px-2 focus:ring ring-sky-300 duration-300"
                                        />
                                    </div>
                                </div>
                            ))
                        }
                        <div className="mt-4 flex justify-end">
                            <div className="mr-4">
                                <Button click={IncrementSub} text="Нэмэх" color="amber" />
                            </div>
                            <div>
                                <Button click={DecrementSub} text="Хасах" color="gray" />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button click={CreateCategory} text="Болсон" color="green" />
                        </div>
                    </div>
                )
            case 'delete':
                return (
                    <div className="mt-8 grid grid-rows-2 gap-4">
                        <p>Мөрийг устгах уу?</p>
                        <div className="grid grid-cols-2 gap-4">
                            <Button click={DeleteCategory} text="Тийм" color="green" />
                            <Button click={() => closeModal()} text="Үгүй" color="gray" />
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <MainLayout>
            {isAlertOpen && <Alert content={msg} type={errType} />}
            {isModalOpen && <Modal content={modalContent()} />}
            <Button click={() => { setType('create'), openModal() }} icon={<IconCategoryPlus />} color="green" text="Нэмэх" />
            {
                categories?.length > 0 ?
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        {
                            categories.map(cat => {
                                return (
                                    <div key={cat.mark} className="flex items-center justify-between border border-stone-200 rounded-xl hover:shadow-xl duration-300">
                                        <div className="p-4 w-48">
                                            <p className="font-bold text-xs truncate">{cat.mn}</p>
                                        </div>
                                        <div className="mr-2">
                                            <IconTrash size={18} onClick={() => { setType('delete'), setDel(cat.mark), openModal() }} className="cursor-pointer" />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    null
            }
        </MainLayout>
    )
}