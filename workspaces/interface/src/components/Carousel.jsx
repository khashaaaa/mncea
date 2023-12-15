import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import banner from '/banner.png'

export const Carousel = () => {

    return (
        <div style={{ marginRight: '15%', marginLeft: '15%', marginTop: '2rem' }}>
            <Swiper>
                <SwiperSlide>
                    <img src={banner} />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}