import { useContext, useEffect, useState } from "react"
import { MainLayout } from "../layouts/MainLayout"
import { Button } from "../components/Button"
import { base_url } from "../config/global"
import { Link } from "react-router-dom"
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react"
import { ModalContext } from "../context/ModalProvider"
import { Modal } from "../components/Modal"

export const PostList = () => {

    const [posts, setPosts] = useState([])
    const [del, setDel] = useState(null)
    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)

    useEffect(() => {
        FetchPosts()
    }, [])

    const FetchPosts = async () => {
        const raw = await fetch(base_url + 'post')
        const resp = await raw.json()
        setPosts(resp)
    }

    const RemovePost = async () => {
        const options = {
            method: 'DELETE'
        }

        const raw = await fetch(base_url + 'post/' + del + '/delete', options)
        const resp = await raw.json()
        if (resp.ok) {
            closeModal()
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
                <Button color="green" text="Нийтлэл нэмэх" />
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
                                    <IconTrash onClick={() => { openModal(), setDel(post.mark) }} className="cursor-pointer" />
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
