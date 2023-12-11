import { useEffect, useState } from "react"
import { MainLayout } from "../layouts/MainLayout"
import { useParams, useNavigate } from 'react-router-dom'
import { base_url } from "../config/global"
import Cookiez from 'js-cookie'

export const Post = () => {

    const access_token = Cookiez.get('access_token')

    const navigate = useNavigate()

    const { mark } = useParams()

    const [post, setPost] = useState(null)

    const thumbnailUrl = post?.thumbnail ? `${base_url}post/thumbnail/${post.thumbnail}` : ''

    useEffect(() => {
        if (!access_token) {
            navigate('/login')
        }
        const FetchPost = async () => {
            const raw = await fetch(`${base_url}post/${mark}`)
            const resp = await raw.json()
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
                <p>{post?.title}</p>
                <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
            </div>
        </MainLayout>
    )
}