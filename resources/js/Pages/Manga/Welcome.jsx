import AboutUs from '@/Components/Atoms/AboutUs';
import HeroSlider from '@/Components/Organisms/HeroSlider';
import MangaCardSlider from '@/Components/Organisms/MangaCardSlider';
import SocialShare from '@/Components/Organisms/SocialShare';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { lastUpdateMangas, popularMangas, recentlyAdded, popularNewMangas } =
        usePage().props;
    console.log({ popularNewMangas });

    return (
        <GuestLayout>
            <Head title="Welcome" />
            <HeroSlider data={popularNewMangas} />

            <section className="mt-4 space-y-2 px-4 text-justify 2xl:px-0">
                <AboutUs className="hidden lg:block" />
                <SocialShare />
            </section>
            {/* <Card manga={popularNewMangas[0]} />
            <Card manga={popularMangas[0]} />
            <Card manga={recentlyAdded[0]} />
            <Card manga={lastUpdateMangas[0]} /> */}
            <MangaCardSlider data={popularNewMangas} />
        </GuestLayout>
    );
}
