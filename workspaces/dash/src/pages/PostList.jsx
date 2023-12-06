import { useEffect, useState } from "react"
import { MainLayout } from "../layouts/MainLayout"
import { base_url } from "../config/global"
import { Link } from "react-router-dom"

export const PostList = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        FetchPosts()
    }, [])

    const FetchPosts = async () => {
        const raw = await fetch(base_url + 'post')
        const resp = await raw.json()
        setPosts(resp)
    }

    return (
        <MainLayout>
            <Link to="/publish">
                <button type="button" className='w-24 ml-2 bg-green-700 text-white font-bold rounded-md py-1'>Нэмэх</button>
            </Link>
            <div className="mt-4 grid grid-cols-3 gap-4">
                {
                    posts.map(post => {
                        return (
                            <Link to={`/${post.mark}`} key={post.mark} className="cursor-pointer border border-stone-200 rounded-xl hover:shadow-xl duration-300">
                                <img src={post.thumbnail} className="rounded-t-xl border-b border-stone-200" />
                                <div className="p-4">
                                    <p className="font-bold">{post.title}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </MainLayout>
    )
}
