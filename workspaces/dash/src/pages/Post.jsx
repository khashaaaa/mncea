import { useContext, useEffect, useState } from "react"
import { MainLayout } from "../layouts/MainLayout"
import { useParams, useNavigate } from 'react-router-dom'
import { base_url } from "../config/global"
import Cookiez from 'js-cookie'
import { MenuContext } from "../context/MenuProvider"

export const Post = () => {

    const access_token = Cookiez.get('access_token')

    const navigate = useNavigate()

    const { setActive } = useContext(MenuContext)

    const { mark } = useParams()

    const [post, setPost] = useState(null)

    const thumbnailUrl = post?.thumbnail ? `${base_url}post/thumbnail/${post.thumbnail}` : ''

    useEffect(() => {
        setActive('post')
        if (!access_token) {
            navigate('/login')
        }
        const FetchPost = async () => {
            const raw = await fetch(`${base_url}post/${mark}`)
            const resp = await raw.json()
            const dateObject = new Date(resp.data.posted_date)
            const formattedTimestamp = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} ${dateObject
                    .getHours()
                    .toString()
                    .padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}`
            resp.data.posted_date = formattedTimestamp
            setPost(resp.data)
        }

        FetchPost()
    }, [])

    return (
        <MainLayout>
            <div>
                <img
                    src={thumbnailUrl}
                    alt={`Thumbnail for ${post?.title || 'Post'}`}
                    className="w-80"
                />
                <p className="mt-4">Огноо: {post?.posted_date}</p>
                <p className="my-4 font-bold text-xl">{post?.title}</p>
                <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
            </div>
        </MainLayout>
    )
}