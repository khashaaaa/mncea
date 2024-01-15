import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export const Partnership = () => {

    const partners = [
        {
            name: 'Alfaromeo',
            website: 'https://www.alfaromeousa.com',
            logo: 'https://1000logos.net/wp-content/uploads/2018/09/Alfa-logo-500x281.jpg'
        },
        {
            name: 'Bobcat',
            website: 'https://www.bobcat.com/sea/en',
            logo: 'https://1000logos.net/wp-content/uploads/2023/06/Bobcat-Company-Logo-500x281.jpg'
        },
        {
            name: 'Borgward',
            website: 'https://www.borgward.com',
            logo: 'https://1000logos.net/wp-content/uploads/2020/10/Borgward-Logo-500x313.jpg'
        },
        {
            name: 'Ducati',
            website: 'https://www.ducati.com',
            logo: 'https://1000logos.net/wp-content/uploads/2020/06/Ducati-Logo-500x281.png'
        },
        {
            name: 'Ferrari',
            website: 'https://www.ferrari.com',
            logo: 'https://1000logos.net/wp-content/uploads/2018/02/Symbol-Ferrari-500x281.jpg'
        },
        {
            name: 'Fisker',
            website: 'https://www.fisker.com',
            logo: 'https://1000logos.net/wp-content/uploads/2023/07/Fisker-Logo-500x281.jpg'
        },
        {
            name: 'Ford',
            website: 'https://www.ford.com',
            logo: 'https://1000logos.net/wp-content/uploads/2018/02/Ford-Logo-2003-500x281.png'
        },
        {
            name: 'Ginetta',
            website: 'https://www.ginetta.com',
            logo: 'https://1000logos.net/wp-content/uploads/2023/08/Ginetta-Logo-500x281.jpg'
        },
        {
            name: 'Hino',
            website: 'https://www.hino.com',
            logo: 'https://1000logos.net/wp-content/uploads/2020/06/Hino-Logo-500x281.jpg'
        },
        {
            name: 'Jac',
            website: 'https://www.jac.com',
            logo: 'https://1000logos.net/wp-content/uploads/2020/07/JAC-Logo-500x281.jpg'
        },
        {
            name: 'Kamaz',
            website: 'https://www.kamaz.com',
            logo: 'https://1000logos.net/wp-content/uploads/2023/08/KAMAZ-Logo-500x281.jpg'
        },
        {
            name: 'Lamborghini',
            website: 'https://www.lamborghini.com',
            logo: 'https://1000logos.net/wp-content/uploads/2018/03/Lamborghini-logo-1-500x400.jpg'
        }
    ]

    return (
        <div className='bg-sec py-4'>
            <div style={{ margin: '0 15%' }}>
                <Swiper slidesPerView={6}>
                    {
                        partners.map(partner => {
                            return (
                                <SwiperSlide key={partner.name} className='flex justify-center items-center'>
                                    <img src={partner.logo} alt={partner.name} className='h-20' />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>

    )
}