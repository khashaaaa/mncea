import { useContext, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { MainLayout } from "../layouts/MainLayout"
import { Button } from "../components/Button"
import { base_url } from "../config/global"
import { Link } from "react-router-dom"
import { IconEdit, IconPencilPlus, IconTrash } from "@tabler/icons-react"
import { ModalContext } from "../context/ModalProvider"
import { Modal } from "../components/Modal"
import Cookiez from 'js-cookie'
import { MenuContext } from "../context/MenuProvider"
import NoThumb from '/no-thumbnail.jpg'

export const PostList = () => {

    const access_token = Cookiez.get('access_token')

    const navigate = useNavigate()

    const [language, setLanguage] = useState('mn')
    const [posts, setPosts] = useState([])
    const [del, setDel] = useState(null)

    const { setActive } = useContext(MenuContext)
    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)

    useEffect(() => {
        setActive('post')
        if (!access_token) {
            navigate('/login')
        }
        FetchPosts()
    }, [language])

    const FetchPosts = async () => {
        const raw = await fetch(`${base_url}post?language=${language}`)
        const resp = await raw.json()
        setPosts(resp)
    }

    const RemovePost = async () => {
        try {
            const imageOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ thumbnail: del.thumbnail })
            }

            if (del.thumbnail) {
                const rawImg = await fetch(base_url + 'post/sweep', imageOptions)
                const respImg = await rawImg.json()

                if (!respImg.ok) {
                    console.error('Image not found:', respImg.message)
                    return
                }
            }

            const postOptions = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }

            const rawPost = await fetch(base_url + 'post/' + del.mark + '/delete', postOptions)
            const respPost = await rawPost.json()

            if (respPost.ok) {
                closeModal()
                FetchPosts()
            }
        } catch (error) {
            console.error('Error while removing post:', error.message)
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
            <div className="flex items-center">
                <Link to="/publish">
                    <Button color="green" text="Нэмэх" icon={<IconPencilPlus />} />
                </Link>
                <select defaultValue={language} onChange={(e) => setLanguage(e.target.value)} className="ml-4 outline-none bg-white rounded-md border border-stone-200 px-2 py-1">
                    <option value="mn">Монгол</option>
                    <option value="en">English</option>
                </select>
                <p className="ml-4">Нийт: {posts.length}</p>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
                {
                    posts.map(post => {
                        return (
                            <div key={post.mark} className="border border-stone-200 rounded-2xl hover:shadow-xl duration-300">
                                {
                                    post.thumbnail ?
                                        <img src={`${base_url}post/thumbnail/${post.thumbnail}`} alt={post.thumbnail} className="object-cover h-60 w-full rounded-t-xl border-b border-stone-200" />
                                        :
                                        <img src={NoThumb} alt="empty" className="object-cover h-60 w-full rounded-t-xl border-b border-stone-200" />
                                }
                                <div className="p-2 h-20 flex flex-col justify-between">
                                    <p className="font-bold text-xs">{post.title}</p>
                                    <div className="flex justify-end">
                                        <Link to={`/post/${post.mark}/update`} className="mr-2">
                                            <IconEdit size={18} />
                                        </Link>
                                        <IconTrash size={18} onClick={() => { openModal(), setDel(post) }} className="cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </MainLayout>
    )
}
