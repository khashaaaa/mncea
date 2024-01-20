import { useEffect, useState } from "react"
import { base_url } from "../../environment/url"
import { useNavigate } from "react-router-dom"

export const Sidebar = () => {

    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        GetPosts()
    }, [])

    const GetPosts = async () => {

        const raw = await fetch(`${base_url}/post`)
        const resp = await raw.json()
        setPosts(resp)
    }

    const pageNav = (mark) => {
        navigate(`/post/${mark}`)
    }

    return (
        <div className="mt-8 col-span-1">
            {
                posts.map((post, num) => {
                    return (
                        <div onClick={() => pageNav(post.mark)} key={post.mark} className="cursor-pointer mb-4 border-b pb-2">
                            <img src={`${base_url}/post/thumbnail/${post.thumbnail}`} alt={post.title} className="rounded-xl w-40 h-24" />
                            <p className="mt-2 uppercase text-sm">{post.title}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}