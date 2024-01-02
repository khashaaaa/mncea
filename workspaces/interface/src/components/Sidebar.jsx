import { useEffect, useState } from "react"
import { base_url } from "../../../dash/src/config/global"

export const Sidebar = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        GetPosts()
    }, [])

    const GetPosts = async () => {

        const raw = await fetch('/server/post')
        const resp = await raw.json()
        setPosts(resp)
    }

    return (
        <div className="mt-8">
            {
                posts.map((post, num) => {
                    return (
                        <div key={post.mark} className="mb-4 border-b pb-2">
                            <img src={`${base_url}post/thumbnail/${post.thumbnail}`} alt={post.title} className="rounded-xl w-48 h-32" />
                            <p className="mt-2 uppercase text-sm">{post.title}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}