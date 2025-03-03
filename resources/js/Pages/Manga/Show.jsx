import Tags from '@/Components/Atoms/Tags';
import Title from '@/Components/Atoms/Title';
import ExpandableText from '@/Components/Molecules/ExpandableText';
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
        <GuestLayout className="bg-plumpPurple">
            <Head title={manga.title} />

            <div
                style={{
                    backgroundImage: `linear-gradient(59deg, rgba(18,6,46,0.7987570028011204) 40%, rgba(255,255,255,0.4009978991596639) 60%, rgba(32,35,79,0.7987570028011204) 80%), url(${coverArt})`,
                }}
                className={cn('h-96 bg-cover bg-center bg-no-repeat')}
            ></div>
            <section className="bg-plumpPurpleLight">
                <div className="container flex gap-4 py-6">
                    <div className="">
                        <figure className="sticky top-0 min-w-44">
                            <img
                                src={thumbnailSm}
                                className="aspect-[7/10] w-64 rounded-xl border-2 border-plumpPurpleDark object-cover object-center transition-all duration-200 ease-linear"
                                alt="poster"
                            />
                        </figure>
                    </div>
                    <div className="flex flex-1 flex-col font-poppins">
                        <Title className="text-plumpPurpleDark" level={1}>
                            {title}
                        </Title>
                        {originalTitle && (
                            <span className="hidden text-sm italic text-plumpPurpleDark md:block">
                                {originalTitle}
                            </span>
                        )}
                        <div className="my-2 mb-5 hidden flex-wrap gap-x-2 gap-y-1 lg:flex">
                            <Tags
                                className="cursor-pointer bg-plumpPurple"
                                tags={tags}
                            />
                        </div>

                        <ExpandableText description={description} />
                    </div>
                    <div className="flex min-w-64 flex-col px-4 font-poppins text-sm text-plumpPurpleDark">
                        <div className="space-y-1 rounded-xl border border-plumpPurpleDark px-4 py-10 font-sintony shadow-sm shadow-plumpPurpleDark">
                            <h5 className="text-lg font-bold">
                                Detalles del manga
                            </h5>
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
                </div>
            </section>
        </GuestLayout>
    );
}
