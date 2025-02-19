import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../Molecules/HeroCard';

export default function HeroSlider({ data }) {
    return (
        <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            loop={true}
            slidesPerView={1}
            // onSlideChange={() => console.log('slide change')}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
        >
            {data.map((item, index) => (
                <SwiperSlide key={index}>
                    <Card manga={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
