import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { base_url } from "../../environment/url"

export const NewsGrid = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        GetPosts()
    }, [])

    const GetPosts = async () => {

        const raw = await fetch(`${base_url}/post`)
        const resp = await raw.json()
        setPosts(resp)
    }

    return (
        <div style={{ margin: '2rem 15%' }}>
            <div className="flex justify-between items-center">
                <p className="font-bold text-xl">Мэдээ мэдээлэл</p>
                <span className="w-2/3 border border-gray-300"></span>
                <p className="font-bold bg-sky-600 rounded-md px-2 py-1 text-white">Сүүлд нэмэгдсэн</p>
            </div>
            {
                posts.length > 0 &&
                <div className="mt-8 grid grid-cols-3 gap-8">
                    {
                        posts?.map((post, num) => {
                            return (
                                <Link key={post.mark} to={`/post/${post.mark}`} className="bg-white rounded-md shadow hover:shadow-lg duration-100">
                                    <div className="bg-no-repeat h-60 bg-center bg-cover rounded-t-md" style={{ backgroundImage: `url(${base_url}/post/thumbnail/${post.thumbnail})` }}></div>
                                    <div className="col-span-2 p-4">
                                        <p className="text-md font-bold">{post.title}</p>
                                        <p className="text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur eos quas id in aut distinctio accusantium quis qui architecto provident?</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>

            }
        </div>
    )
}