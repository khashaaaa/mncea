import { useEffect, useState } from "react"
import { MainLayout } from "../layouts/MainLayout"
import { useParams } from 'react-router-dom'
import { base_url } from "../config/global"

export const Post = () => {

    const { mark } = useParams()

    const [post, setPost] = useState(null)

    const thumbnailUrl = post?.thumbnail ? `${base_url}post/thumbnail/${post.thumbnail}` : ''

    useEffect(() => {
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