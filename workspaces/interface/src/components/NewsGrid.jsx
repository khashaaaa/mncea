import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { base_url } from "../../environment/url"

export const NewsGrid = ({ margin }) => {

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
        <div style={{ margin: margin }}>
            <div className="my-8">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-xl">Мэдээ мэдээлэл</p>
                    <span className="w-1/2 border border-gray-300 sm:w-1/4"></span>
                    <p className="font-bold bg-sky-600 rounded-md px-2 py-1 text-white sm:text-xs md:text-xs">Сүүлд нэмэгдсэн</p>
                </div>
                {
                    posts.length > 0 &&
                    <div className="mt-8 grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-8">
                        {
                            posts?.map((post, num) => {
                                return (
                                    <Link key={post.mark} to={`/post/${post.mark}`} className="bg-white rounded-md shadow hover:shadow-lg duration-100">
                                        <div className="bg-no-repeat h-60 bg-center bg-cover rounded-t-md" style={{ backgroundImage: `url(${base_url}/post/thumbnail/${post.thumbnail})` }}></div>
                                        <div className="col-span-2 p-4">
                                            <p className="text-md font-bold truncate">{post.title}</p>
                                            <p className="text-xs line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur eos quas id in aut distinctio accusantium quis qui architecto provident?</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>

                }
            </div>
        </div>
    )
}