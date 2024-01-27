import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SpecialMenu } from './SpecialMenu'
import { base_url } from '../../environment/url'
import { useEffect, useState } from 'react'

export const ShowCase = ({ margin }) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        FetchPosts()
    }, [])

    const FetchPosts = async () => {
        const raw = await fetch(`${base_url}/post/priority`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    priority: 'featured'
                })
            }
        )

        const resp = await raw.json()

        setPosts(resp.data)
    }

    return (
        <div className="bg-carousel_back bg-no-repeat bg-bottom py-8 text-sm relative">
            <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-main to-sky-700 opacity-80'></div>
            <div className="relative" style={{ margin: margin }}>
                <SpecialMenu />
                {
                    posts.length > 0 &&
                    <Swiper modules={[Pagination, Navigation]} navigation pagination={{ clickable: true }}>
                        {
                            posts.map(pst => {
                                return (
                                    <SwiperSlide key={pst.mark} className="mt-8 grid grid-cols-2 sm:grid-rows-2 sm:grid-cols-1 gap-8 bg-gradient-to-l from-sky-900 to-transparent rounded-xl">
                                        <div>
                                            <img src={`${base_url}/post/thumbnail/${pst.thumbnail}`} alt={pst.title} className='rounded-xl h-full' />
                                        </div>
                                        <div className='flex flex-col justify-center px-4'>
                                            <p className='truncate text-white text-2xl border-l-8 border-white pl-8 cursor-pointer sm:text-md hover:underline'>{pst.title}</p>
                                            <div className='flex justify-end mr-4 mt-4'>
                                                <button className='bg-white rounded-md px-4 py-1 hover:bg-gray-100'>Цааш унших</button>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                }
            </div>
        </div>
    )
}
