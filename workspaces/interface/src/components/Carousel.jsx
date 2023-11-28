import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export const Carousel = () => {

    return (
        <div style={{ marginRight: '15%', marginLeft: '15%', marginTop: '2rem' }}>
            <Swiper slidesPerView={1} spaceBetween={20}>
                <SwiperSlide>
                    <div className="rounded-xl" style={{ height: '460px', backgroundImage: 'url(/one.jpg)' }}></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rounded-xl" style={{ height: '460px', backgroundImage: 'url(/two.jpg)' }}></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="rounded-xl" style={{ height: '460px', backgroundImage: 'url(/three.jpg)' }}></div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}