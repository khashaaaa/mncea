import { useContext, useEffect, useState } from "react"
import { SpecialMenu } from "../components/SpecialMenu"
import { MainLayout } from "../layouts/MainLayout"
import { useParams } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { base_url } from "../../environment/url"
import { ResponsiveContext } from "../context/ResponsiveProvider"

export const Post = () => {

    const { deviceSize } = useContext(ResponsiveContext)

    const { mark } = useParams()

    const [margin, setMargin] = useState(null)
    const [post, setPost] = useState([])

    useEffect(() => {
        let s
        switch (deviceSize) {
            case 'mobile':
                s = '0 1rem'
                break
            case 'tablet':
                s = '0 5%'
                break
            case 'smallMonitor':
                s = '0 10%'
                break
            default:
                s = '0 15%'
        }
        setMargin(s)
        GetPosts()
    }, [mark, deviceSize])

    const GetPosts = async () => {

        const raw = await fetch(`${base_url}/post/${mark}`)
        const resp = await raw.json()
        setPost(resp.data)
    }

    return (
        <MainLayout>
            <div className="bg-carousel_back bg-no-repeat bg-bottom py-8 text-sm relative">
                <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-main to-sky-700 opacity-80'></div>
                <div className="relative" style={{ margin: margin }}>
                    <SpecialMenu />
                </div>
            </div>
            <div style={{ margin: margin }}>
                <div className="grid grid-cols-4 gap-8 sm:block my-8">
                    <Sidebar />
                    <div className="col-span-3 border-l pl-8 sm:border-none sm:p-0 sm:block">
                        <p className="font-bold text-xl">{post.title}</p>
                        <div className="mt-4 break-words" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}