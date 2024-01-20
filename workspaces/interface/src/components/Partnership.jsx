import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { base_url } from '../../environment/url'
import { useEffect, useState } from 'react'

export const Partnership = () => {

    const [partners, setPartners] = useState([])

    useEffect(() => {
        FetchPartners()
    }, [])

    const FetchPartners = async () => {

        const raw = await fetch(`${base_url}/partnership`)
        const resp = await raw.json()

        setPartners(resp.data)
    }

    return (
        partners.length > 0 && <div className='bg-sec py-4 border-b border-slate-700'>
            <div style={{ margin: '0 15%' }}>
                <Swiper slidesPerView={8} spaceBetween={30}>
                    {
                        partners.map(partner => {
                            return (
                                <SwiperSlide key={partner.name} className='cursor-pointer'>
                                    <div className="bg-no-repeat bg-cover bg-center h-20" style={{ backgroundImage: `url(${base_url}/partnership/logo/${partner.logo})` }}></div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>

    )
}