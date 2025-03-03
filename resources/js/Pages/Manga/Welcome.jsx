import AboutUs from '@/Components/Atoms/AboutUs';
import Wave from '@/Components/Atoms/SvgIcons/Wave';
import Title from '@/Components/Atoms/Title';
import HeroSlider from '@/Components/Organisms/HeroSlider';
import MangaCardSlider from '@/Components/Organisms/MangaCardSlider';
import SocialShare from '@/Components/Organisms/SocialShare';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { lastUpdateMangas, popularMangas, recentlyAdded, popularNewMangas } =
        usePage().props;

    return (
        <GuestLayout>
            <Head title="Welcome" />
            <HeroSlider data={popularMangas} className="container" />

            <section className="container mt-4 space-y-2 px-4 pb-5 text-justify 2xl:px-0">
                <AboutUs className="hidden lg:block" />
                <SocialShare />
            </section>
            <section className="relative bg-plumpPurpleDark px-4 pt-5">
                <div className="container">
                    <Title level={2}>Trending</Title>
                    <MangaCardSlider data={popularNewMangas} />
                </div>
            </section>
            <section className="h-screen bg-white">
                <Wave className="text-plumpPurpleDark" />
                <div className="container relative">
                    <figure className="absolute -left-20 -top-40 h-[500px] w-[400px] bg-gradient-momo bg-cover bg-top transition-all duration-200 ease-linear hover:scale-105"></figure>
                </div>
            </section>
        </GuestLayout>
    );
}
