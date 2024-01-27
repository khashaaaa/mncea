import { useContext, useEffect, useState } from "react"
import { SpecialMenu } from "../components/SpecialMenu"
import { MainLayout } from "../layouts/MainLayout"
import { base_url } from "../../environment/url"
import { useParams } from "react-router-dom"
import { ResponsiveContext } from "../context/ResponsiveProvider"

export const PostSub = () => {

    const { mark } = useParams()

    const { deviceSize } = useContext(ResponsiveContext)

    const [margin, setMargin] = useState(null)

    const [posts, setPosts] = useState([])

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
        GetPost()
    }, [mark, deviceSize])

    const GetPost = async () => {
        const raw = await fetch(`${base_url}/post/sub/${mark}`)
        const resp = await raw.json()
        setPosts(resp)
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
                <div className="my-8">
                    {
                        posts.map((post, num) => {
                            return (
                                <p key={post.mark}>{post.title}</p>
                            )
                        })
                    }
                </div>
            </div>
        </MainLayout>
    )
}