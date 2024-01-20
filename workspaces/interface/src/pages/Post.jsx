import { useEffect, useState } from "react"
import { SpecialMenu } from "../components/SpecialMenu"
import { MainLayout } from "../layouts/MainLayout"
import { useParams } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { base_url } from "../../environment/url"

export const Post = () => {

    const { mark } = useParams()

    const [post, setPost] = useState([])

    useEffect(() => {
        GetPosts()
    }, [mark])

    const GetPosts = async () => {

        const raw = await fetch(`${base_url}/post/${mark}`)
        const resp = await raw.json()
        setPost(resp.data)
    }

    return (
        <MainLayout>
            <div className="bg-carousel_back bg-no-repeat bg-bottom py-8 text-sm relative">
                <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-main to-sky-700 opacity-80'></div>
                <div className="relative" style={{ margin: '0 15%' }}>
                    <SpecialMenu />
                </div>
            </div>
            <div style={{ margin: '2rem 15%' }} className="grid grid-cols-4 gap-8">
                <Sidebar />
                <div className="col-span-3 border-l pl-8">
                    <p className="font-bold text-xl">{post.title}</p>
                    <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </div>
            </div>
        </MainLayout>
    )
}