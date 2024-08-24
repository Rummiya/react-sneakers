import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import 'swiper/css/bundle';
import "./slider.scss"

const Slider = () => {
    return (  
        <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            >
            <SwiperSlide>
                <img src="/assets/slider/slide-1.png" alt="slide-1" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="/assets/slider/slide-1.png" alt="slide-1" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="/assets/slider/slide-1.png" alt="slide-1" />
            </SwiperSlide>
        </Swiper>
    );
}
 
export default Slider;