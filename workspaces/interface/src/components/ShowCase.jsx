import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import banner from '/banner.png'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export const ShowCase = () => {
    const [mega, setMega] = useState(0)
    const [baseCategories, setBaseCategories] = useState([])
    const [midCategories, setMidCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        GetMenuData()
    }, [])

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
                <p key={cat.mark} className="ml-4 py-1 text-gray-700 hover:text-black"><Link to={`/post/sub/${cat.mark}`} key={cat.mark}>{cat?.name}</Link></p>
            ))
    }

    return (
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
                                className={`${mega === active ? "bg-sky-700 text-white rounded-t-md" : "bg-white rounded-md"} border-2 border-sky-700 flex items-center justify-center py-2 cursor-pointer`}
                            >
                                <p className="font-bold uppercase text-xs">{cat?.name}</p>
                                {mega === active ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                            </div>
                        )
                    })}
                </div>

                <div onMouseLeave={() => setMega(0)} className={`${mega === 0 && 'hidden'} absolute grid grid-cols-3 gap-2 w-full z-10`}>
                    <div onMouseEnter={() => setMega(1)} onMouseLeave={() => setMega(0)} className={mega === 1 ? "bg-white duration-300 p-2 rounded-b-md" : "invisible mt-4 p-2 text-gray-800"}>
                        {renderMidCategories(5)}
                    </div>

                    <div onMouseEnter={() => setMega(2)} onMouseLeave={() => setMega(0)} className={mega === 2 ? "bg-white duration-300 p-2 rounded-b-md" : "invisible mt-4 p-2 text-gray-800"}>
                        {renderMidCategories(6)}
                    </div>

                    <div onMouseEnter={() => setMega(3)} onMouseLeave={() => setMega(0)} className={mega === 3 ? "bg-white duration-300 p-2 rounded-b-md" : "invisible mt-4 p-2 text-gray-800"}>
                        {renderMidCategories(7)}
                    </div>
                </div>

                <Swiper modules={[Pagination, Navigation]} navigation pagination={{ clickable: true }}>
                    <SwiperSlide className="mt-8 grid grid-cols-2 gap-8 bg-gradient-to-l from-sky-900 to-transparent rounded-xl">
                        <div>
                            <img src={banner} alt="" className='rounded-xl h-full' />
                        </div>
                        <div className='flex flex-col justify-center px-4'>
                            <p className='text-white text-2xl border-l-8 border-white pl-8 cursor-pointer hover:underline'>Боловсролын магадлан итгэмжлэх үндэсний зөвлөл байгуулагдсаны 25 жилийн ой</p>
                            <div className='flex justify-end mr-4 mt-4'>
                                <button className='bg-white rounded-md px-4 py-1 hover:bg-gray-100'>Цааш унших</button>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="mt-8 grid grid-cols-2 gap-8 bg-gradient-to-l from-sky-900 to-transparent rounded-xl">
                        <div>
                            <img src={banner} alt="" className='rounded-xl h-full' />
                        </div>
                        <div className='flex flex-col justify-center px-4'>
                            <p className='text-white text-2xl border-l-8 border-white pl-8 cursor-pointer hover:underline'>Боловсролын магадлан итгэмжлэх үндэсний зөвлөл байгуулагдсаны 25 жилийн ой</p>
                            <div className='flex justify-end mr-4 mt-4'>
                                <button className='bg-white rounded-md px-4 py-1 hover:bg-gray-100'>Цааш унших</button>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}
