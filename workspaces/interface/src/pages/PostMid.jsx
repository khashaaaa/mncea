import { useEffect, useState } from "react"
import { SpecialMenu } from "../components/SpecialMenu"
import { MainLayout } from "../layouts/MainLayout"
import { base_url } from "../../environment/url"
import { useParams } from "react-router-dom"

export const PostMid = () => {

    const { mark } = useParams()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        GetPost()
    }, [mark])

    const GetPost = async () => {
        const raw = await fetch(`${base_url}/post/mid/${mark}`)
        const resp = await raw.json()
        setPosts(resp)
    }

    return (
        <MainLayout>
            <div className="bg-carousel_back bg-no-repeat bg-bottom py-8 text-sm relative">
                <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-main to-sky-700 opacity-80'></div>
                <div className="relative" style={{ margin: '0 15%' }}>
                    <SpecialMenu />
                </div>
            </div>
            <div style={{ margin: '2rem 15%' }}>
                {
                    posts.map((post, num) => {
                        return (
                            <p key={post.mark}>{post.title}</p>
                        )
                    })
                }
            </div>
        </MainLayout>
    )
}