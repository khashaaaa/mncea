import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { base_url } from '../../environment/url'
import { useEffect, useState } from 'react'

export const Partnership = ({ margin, deviceSize }) => {

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
            <div style={{ margin: margin }}>
                <Swiper modules={[Autoplay]} autoplay={{ delay: 2000, disableOnInteraction: true }} slidesPerView={deviceSize === 'mobile' && 3 || deviceSize === 'tablet' && 6 || deviceSize === 'smallMonitor' && 8 || 8} spaceBetween={30}>
                    {
                        partners.map(partner => {
                            return (
                                <SwiperSlide key={partner.name} className='cursor-pointer'>
                                    <a href={partner.website} target="_blank">
                                        <div className="bg-no-repeat bg-contain bg-center max-h-20 h-16" style={{ backgroundImage: `url(${base_url}/partnership/logo/${partner.logo})` }}></div>
                                    </a>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>

    )
}