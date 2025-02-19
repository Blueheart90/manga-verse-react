import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MangaCard from '../Molecules/MangaCard';

export default function MangaCardSlider({ data }) {
    return (
        <Swiper
            modules={[Autoplay]}
            effect="fade"
            loop={true}
            slidesPerView={5}
            // onSlideChange={() => console.log('slide change')}
            // autoplay={{
            //     delay: 2500,
            //     disableOnInteraction: false,
            //     pauseOnMouseEnter: true,
            // }}
        >
            {data.map((item) => (
                <SwiperSlide key={item.id}>
                    <MangaCard manga={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
