import banner from '/banner.png'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SpecialMenu } from './SpecialMenu'

export const ShowCase = () => {

    return (
        <div className="bg-carousel_back bg-no-repeat bg-bottom py-8 text-sm relative">
            <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-main to-sky-700 opacity-80'></div>
            <div className="relative" style={{ margin: '0 15%' }}>
                <SpecialMenu />

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
