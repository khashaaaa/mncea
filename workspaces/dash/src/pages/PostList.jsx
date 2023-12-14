import { useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { MainLayout } from "../layouts/MainLayout"
import { Button } from "../components/Button"
import { base_url } from "../config/global"
import { Link } from "react-router-dom"
import { IconEdit, IconEye, IconPencilPlus, IconTrash } from "@tabler/icons-react"
import { ModalContext } from "../context/ModalProvider"
import { Modal } from "../components/Modal"
import Cookiez from 'js-cookie'
import { MenuContext } from "../context/MenuProvider"

export const PostList = () => {

    const access_token = Cookiez.get('access_token')

    const navigate = useNavigate()

    const [posts, setPosts] = useState([])
    const [del, setDel] = useState(null)

    const { menuOpen, setActive } = useContext(MenuContext)
    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)

    useEffect(() => {
        setActive('post')
        if (!access_token) {
            navigate('/login')
        }
        FetchPosts()
    }, [])

    const FetchPosts = async () => {
        const raw = await fetch(base_url + 'post')
        const resp = await raw.json()
        setPosts(resp)
    }

    const RemovePost = async () => {
        const imageOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ thumbnail: del.thumbnail })
        }
        const postOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }

        const rawImg = await fetch(base_url + 'post/sweep', imageOptions)
        const rawPost = await fetch(base_url + 'post/' + del.mark + '/delete', postOptions)
        const respImg = await rawImg.json()
        const respPost = await rawPost.json()

        if (respImg.ok && respPost.ok) {
            closeModal()
            FetchPosts()
        }
    }

    const modalContent = (
        <div className="mt-8">
            <p>Нийтлэлийг устгах уу?</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={() => RemovePost()} type="button" className="bg-green-600 text-white text-xs font-bold rounded-md py-1 px-2">Тийм</button>
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
            <Link to="/publish">
                <Button color="green" text="Мэдээлэл нэмэх" icon={<IconPencilPlus />} />
            </Link>
            <div className="mt-4 grid grid-cols-4 gap-4">
                {
                    posts.map(post => {
                        return (
                            <div key={post.mark} className="relative border border-stone-200 rounded-xl hover:shadow-xl duration-300">
                                <div className="absolute right-2 top-2 grid grid-cols-3 gap-4 bg-white border border-stone-200 rounded shadow p-1">
                                    <Link to={`/${post.mark}`}>
                                        <IconEye />
                                    </Link>
                                    <Link to={`/${post.mark}/update`}>
                                        <IconEdit />
                                    </Link>
                                    <IconTrash onClick={() => { openModal(), setDel(post) }} className="cursor-pointer" />
                                </div>
                                <img src={`${base_url}post/thumbnail/${post.thumbnail}`} className="rounded-t-xl border-b border-stone-200" />
                                <div className="p-4">
                                    <p className="font-bold text-xs">{post.title}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </MainLayout>
    )
}
