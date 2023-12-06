import { useEffect, useState } from "react"
import { MainLayout } from "../layouts/MainLayout"
import { useParams } from 'react-router-dom'
import { base_url } from "../config/global"
import { Modal } from '../components/Modal'

export const Post = () => {

    const { mark } = useParams()

    const [post, setPost] = useState(null)

    useEffect(() => {
        const FetchPost = async () => {
            const raw = await fetch(`${base_url}post/${mark}`)
            const resp = await raw.json()
            setPost(resp.data)
        }

        FetchPost()
    }, [])

    const content = <div>
        <p>asdfasdfasdfsdf</p>
        <p>asdfasdfasdfsdf</p>
        <p>asdfasdfasdfsdf</p>
    </div>

    return (
        <MainLayout>
            <Modal content={content} />
            <div>
                <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
            </div>
        </MainLayout>
    )
}