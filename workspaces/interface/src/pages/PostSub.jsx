import { useEffect, useState } from "react"
import { SpecialMenu } from "../components/SpecialMenu"
import { MainLayout } from "../layouts/MainLayout"
import { base_url } from "../../../dash/src/config/global"
import { useParams } from "react-router-dom"

export const PostSub = () => {

    const { mark } = useParams()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        GetPost()
    }, [mark])

    const GetPost = async () => {
        const raw = await fetch(`${base_url}post/sub/${mark}`)
        const resp = await raw.json()
        setPosts(resp)
    }

    return (
        <MainLayout>
            <SpecialMenu />
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