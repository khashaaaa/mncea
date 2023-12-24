import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { base_url } from "../../../dash/src/config/global"

export const NewsGrid = () => {

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
        <div style={{ margin: '2rem 15%' }}>
            {
                posts?.map((post, num) => {
                    return (
                        <Link to={`/post/${post.mark}`} key={post.mark} className="grid grid-cols-3 gap-4 mb-4">
                            <img src={`${base_url}post/thumbnail/${post.thumbnail}`} className="rounded-md" />
                            <div className="col-span-2">
                                <p className="text-lg font-bold">{post.title}</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur eos quas id in aut distinctio accusantium quis qui architecto provident?</p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}