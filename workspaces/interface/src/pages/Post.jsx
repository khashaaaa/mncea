import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"

export const Post = () => {
    const { mark } = useParams()
    const [post, setPost] = useState({})

    useEffect(() => {
        fetchPost()
    }, [mark])

    const fetchPost = async () => {
        try {
            const raw = await fetch(`/server/post/${mark}`)
            const resp = await raw.json()
            setPost(resp.data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    return (
        <MainLayout>
            <div style={{ margin: '2rem 15%' }}>
                <p className="font-bold text-xl">{post.title}</p>
                <div dangerouslySetInnerHTML={{ __html: post.content }} className="mt-4"></div>
            </div>
        </MainLayout>
    )
}
