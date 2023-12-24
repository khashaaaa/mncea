import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { MainLayout } from "../layouts/MainLayout"
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"

export const Post = () => {

    const { mark } = useParams()
    const [post, setPost] = useState({})
    const [mega, setMega] = useState(0)
    const [baseCategories, setBaseCategories] = useState([])
    const [midCategories, setMidCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        fetchPost()
        GetMenuData()
    }, [mark])

    const GetMenuData = async () => {
        try {
            const [baseRaw, midRaw, subRaw] = await Promise.all([
                fetch(`/server/basecategory`),
                fetch(`/server/midcategory`),
                fetch(`/server/subcategory`),
            ])

            const [baseResp, midResp, subResp] = await Promise.all([
                baseRaw.json(),
                midRaw.json(),
                subRaw.json(),
            ])

            setBaseCategories(baseResp)
            setMidCategories(midResp)
            setSubCategories(subResp)
        } catch (error) {
            console.error("Error fetching menu data:", error)
        }
    }

    const renderMidCategories = (parentMark) => {
        return midCategories
            .filter((cat) => cat.parent === parentMark)
            .map((cat, num) => (
                <div key={cat.mark} className="py-2 border-b border-gray-200">
                    <Link to={`/post/mid/${cat.mark}`} className="font-bold text-gray-700 hover:text-black">{cat?.name}</Link>
                    <div className="flex flex-col">
                        {renderSubCategories(cat.mark)}
                    </div>
                </div>
            ))
    }

    const renderSubCategories = (midCategoryMark) => {
        return subCategories
            .filter((cat) => cat.parent === midCategoryMark)
            .map((cat, num) => (
                <p className="ml-4 py-1 text-gray-700 hover:text-black"><Link to={`/post/sub/${cat.mark}`} key={cat.mark}>{cat?.name}</Link></p>
            ))
    }

    const fetchPost = async () => {
        try {
            const raw = await fetch(`/server/post/${mark}`)
            const resp = await raw.json()
            setPost(resp.data)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    return (
        <MainLayout>
            <div className="bg-carousel_back bg-no-repeat bg-bottom py-8 text-sm relative">
                <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-main to-sky-700 opacity-80'></div>
                <div className="relative" style={{ margin: '0 15%' }}>
                    <div className="grid grid-cols-3 gap-2">
                        {baseCategories.map((cat, num) => {
                            let active = num + 1
                            return (
                                <div
                                    key={cat.mark}
                                    onMouseEnter={() => setMega(active)}
                                    onMouseLeave={() => setMega(0)}
                                    className={`${mega === active ? "bg-gray-100 rounded-t-md" : "bg-white rounded-md"} flex items-center justify-center py-2 cursor-pointer`}
                                >
                                    <p className="font-bold uppercase text-xs">{cat?.name}</p>
                                    {mega === active ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                                </div>
                            )
                        })}
                    </div>

                    <div onMouseLeave={() => setMega(0)} className={`${mega === 0 && 'hidden'} bg-white absolute grid grid-cols-3 gap-2 w-full rounded-md z-10 shadow-md`}>
                        <div onMouseEnter={() => setMega(1)} className={mega === 1 ? "bg-gray-100 duration-100 rounded-bl p-2" : "mt-2 p-2 rounded-bl text-gray-800"}>
                            {renderMidCategories(5)}
                        </div>

                        <div onMouseEnter={() => setMega(2)} className={mega === 2 ? "bg-gray-100 duration-100 p-2" : "mt-2 p-2 text-gray-800"}>
                            {renderMidCategories(6)}
                        </div>

                        <div onMouseEnter={() => setMega(3)} className={mega === 3 ? "bg-gray-100 duration-100 rounded-br p-2" : "mt-2 p-2 rounded-br text-gray-800"}>
                            {renderMidCategories(7)}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ margin: '2rem 15%' }}>
                <p className="font-bold text-xl">{post.title}</p>
                <div dangerouslySetInnerHTML={{ __html: post.content }} className="mt-4"></div>
            </div>
        </MainLayout>
    )
}
