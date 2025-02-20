import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Arrow from '../Atoms/SvgIcons/Arrow';
import MangaCard from '../Molecules/MangaCard';

export default function MangaCardSlider({ data }) {
    return (
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                loop={true}
                navigation={{
                    nextEl: '.custom-next', // Asocia el botón "Siguiente"
                    prevEl: '.custom-prev', // Asocia el botón "Anterior"
                }}
                slidesPerView={1}
                spaceBetween={20}
                // onSlideChange={() => console.log('slide change')}
                breakpoints={{
                    // when window width is >= 350px
                    350: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    500: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    620: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    850: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                    1100: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                }}
            >
                {data.map((item, index) => (
                    <SwiperSlide key={item.id}>
                        <MangaCard manga={item} pos={index + 1} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="hidden text-white 2xl:inline">
                <button className="custom-prev absolute -left-14 top-1/2 z-50 -translate-y-1/2 rounded-l p-2">
                    <Arrow
                        direction="left"
                        className="size-7"
                        strokeWidth={3}
                    />
                </button>
                <button className="custom-next absolute -right-14 top-1/2 z-50 -translate-y-1/2 rounded-r p-2">
                    <Arrow
                        direction="right"
                        className="size-7"
                        strokeWidth={3}
                    />
                </button>
            </div>
        </div>
    );
}
