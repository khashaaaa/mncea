import { useEffect, useState } from "react"
import { SpecialMenu } from "../components/SpecialMenu"
import { MainLayout } from "../layouts/MainLayout"
import { useParams } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"

export const Post = () => {

    const { mark } = useParams()

    const [post, setPost] = useState([])

    useEffect(() => {
        GetPosts()
    }, [])

    const GetPosts = async () => {

        const raw = await fetch(`/server/post/${mark}`)
        const resp = await raw.json()
        setPost(resp.data)
    }

    return (
        <MainLayout>
            <SpecialMenu />
            <div style={{ margin: '2rem 15%' }} className="grid grid-cols-3 gap-8">
                <Sidebar />
                <div className="col-span-2">
                    <p className="font-bold text-xl">{post.title}</p>
                    <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </div>
            </div>
        </MainLayout>
    )
}