import Tags from '@/Components/Atoms/Tags';
import Title from '@/Components/Atoms/Title';
import DetailsManga from '@/Components/Molecules/DetailsManga';
import ExpandableText from '@/Components/Molecules/ExpandableText';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Show() {
    const [showMore, setShowMore] = useState(false);
    const { manga, statistics: stats } = usePage().props;
    console.log({ stats, manga });

    const {
        title,
        cover_art: coverArt,
        thumbnail_sm: thumbnailSm,
        thumbnail_md: thumbnailMd,
        description,
        type,
        tags,
        title_spa: titleSpa,
        original_title: originalTitle,
        attributes: { originalLanguage, status, publicationDemographic, year },
        staff: { authors, artists },
        info,
    } = manga;

    console.log({ authors });

    return (
        <GuestLayout>
            <Head title={manga.title} />
            <section className="bg-plumpPurpleDark">
                <div className="container flex gap-4 py-14">
                    <figure className="sticky min-w-44">
                        <img
                            src={thumbnailSm}
                            className="aspect-[7/10] w-64 rounded-xl border-4 border-white object-cover object-center transition-all duration-200 ease-linear"
                            alt="poster"
                        />
                    </figure>
                    <div className="flex flex-1 flex-col">
                        <Title level={1}>{title}</Title>
                        {originalTitle && (
                            <span className="hidden text-sm italic text-white md:block">
                                {originalTitle}
                            </span>
                        )}
                        <div className="my-2 mb-5 hidden flex-wrap gap-x-2 gap-y-1 lg:flex">
                            <Tags
                                className="cursor-pointer bg-plumpPurple"
                                tags={tags}
                            />
                        </div>
                        <ExpandableText
                            className="text-white"
                            text={description}
                        />
                    </div>
                    <div className="flex min-w-96 flex-col justify-center border-l border-plumpPurple px-4 font-poppins text-sm text-white">
                        <DetailsManga data={info} />
                    </div>
                </div>
            </section>
            <section className="h-screen bg-white">hh</section>
        </GuestLayout>
    );
}
