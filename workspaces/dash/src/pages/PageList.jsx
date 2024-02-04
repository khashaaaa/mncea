import { useContext, useEffect, useState } from "react"
import { MainLayout } from "../layouts/MainLayout"
import { MenuContext } from "../context/MenuProvider"
import { Link, useNavigate } from "react-router-dom"
import { IconEdit, IconPencilPlus, IconTrash } from "@tabler/icons-react"
import { Button } from "../components/Button"
import Cookiez from 'js-cookie'
import { base_url } from "../../environment/url"
import { ModalContext } from "../context/ModalProvider"
import { Modal } from "../components/Modal"

export const PageList = () => {

    const access_token = Cookiez.get('access_token')

    const navigate = useNavigate()

    const [language, setLanguage] = useState('mn')

    const [pages, setPages] = useState([])
    const [del, setDel] = useState(null)

    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)
    const { setActive } = useContext(MenuContext)

    useEffect(() => {
        setActive('page')
        if (!access_token) {
            navigate('/login')
        }
        FetchPages()
    }, [language])

    const FetchPages = async () => {
        const raw = await fetch(`${base_url}/page?language=${language}`)
        const resp = await raw.json()
        setPages(resp.data)
    }

    const RemovePage = async () => {

        const postOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }

        const rawPost = await fetch(`${base_url}/page/${del.mark}`, postOptions)
        const respPost = await rawPost.json()

        if (respPost.ok) {
            closeModal()
            FetchPages()
        }
    }

    const modalContent = (
        <div className="mt-8">
            <p>Нийтлэлийг устгах уу?</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={() => RemovePage()} type="button" className="bg-green-600 text-white text-xs font-bold rounded-md py-1 px-2">Тийм</button>
                <button onClick={() => closeModal()} type="button" className="bg-gray-600 text-white text-xs font-bold rounded-md py-1 px-2">Болих</button>
            </div>
        </div>
    )

    return (
        <MainLayout>
            {
                isModalOpen ?
                    <Modal content={modalContent} />
                    :
                    null
            }
            <div className="flex items-center">
                <Link to="/createpage">
                    <Button color="green" text="Нэмэх" icon={<IconPencilPlus />} />
                </Link>
                <select defaultValue={language} onChange={(e) => setLanguage(e.target.value)} className="ml-4 outline-none bg-white rounded-md border border-stone-200 px-2 py-1">
                    <option value="mn">Монгол</option>
                    <option value="en">English</option>
                </select>
                <p className="ml-4">Нийт: {pages?.length}</p>
            </div>
            {
                pages.length > 0 ?
                    <div className="mt-4 grid grid-cols-4 gap-4">
                        {
                            pages.map(page => {
                                return (
                                    <div key={page.mark} className="flex items-center justify-between border border-stone-200 rounded-xl hover:shadow-xl duration-300">
                                        <div className="p-4 w-48">
                                            <p className="font-bold text-xs truncate">{page.title}</p>
                                        </div>
                                        <div className="flex justify-between mr-2">
                                            <Link to={`/page/${page.mark}/update`} className="mr-2">
                                                <IconEdit size={18} />
                                            </Link>
                                            <IconTrash size={18} onClick={() => { openModal(), setDel(page) }} className="cursor-pointer" />
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