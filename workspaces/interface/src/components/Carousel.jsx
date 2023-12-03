import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export const Carousel = () => {

    return (
        <div style={{ marginRight: '15%', marginLeft: '15%', marginTop: '2rem' }}>
            <Swiper>
                <SwiperSlide>
                    <div className="rounded-xl" style={{ height: '480px', backgroundImage: 'url(/one.jpg)' }}></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rounded-xl" style={{ height: '480px', backgroundImage: 'url(/two.jpg)' }}></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rounded-xl" style={{ height: '480px', backgroundImage: 'url(/three.jpg)' }}></div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}