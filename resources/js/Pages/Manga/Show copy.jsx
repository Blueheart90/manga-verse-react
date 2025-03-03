import Tags from '@/Components/Atoms/Tags';
import Title from '@/Components/Atoms/Title';
import GuestLayout from '@/Layouts/GuestLayout';
import { cn } from '@/lib/utils';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Show() {
    const [showMore, setShowMore] = useState(false);
    const { manga, statistics: stats } = usePage().props;
    console.log({ stats, manga });

    const {
        title,
        'cover-art': coverArt,
        'thumbnail-sm': thumbnailSm,
        'thumbnail-md': thumbnailMd,
        description,
        type,
        tags,
        'title-spa': titleSpa,
        'original-title': originalTitle,
        attributes: { originalLanguage, status, publicationDemographic, year },
        staff: { authors, artists },
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
                        <div>
                            <p
                                className={cn(
                                    'mb-4 font-poppins text-sm leading-5 text-white lg:text-base',
                                    !showMore ? 'line-clamp-3' : '',
                                )}
                            >
                                {description}
                            </p>
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="py-2 text-sm text-white underline"
                            >
                                {showMore ? 'Leer menos' : 'Leer más'}
                            </button>
                        </div>
                    </div>
                    <div className="flex min-w-96 flex-col justify-center border-l border-plumpPurple px-4 font-poppins text-sm text-white">
                        <div>
                            <span className="font-bold">Type: </span>
                            <span className="capitalize">{type}</span>
                        </div>
                        <div>
                            <span className="font-bold">Status: </span>
                            <span className="capitalize">{status}</span>
                        </div>
                        <div>
                            <span className="font-bold">Authors: </span>
                            <span className="capitalize">
                                {authors.join(', ')}
                            </span>
                        </div>
                        <div>
                            <span className="font-bold">Artists: </span>
                            <span className="capitalize">
                                {artists.join(', ')}
                            </span>
                        </div>
                        <div>
                            <span className="font-bold">Demographic: </span>
                            <span className="capitalize">
                                {publicationDemographic}
                            </span>
                        </div>

                        <div>
                            <span className="font-bold">Year: </span>
                            <span className="capitalize">{year}</span>
                        </div>

                        <div>
                            <span className="font-bold">Score: </span>
                            <span className="capitalize">
                                {stats.rating.rounded}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="h-screen bg-white">hh</section>
        </GuestLayout>
    );
}
