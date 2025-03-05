import Tags from '@/Components/Atoms/Tags';
import Title from '@/Components/Atoms/Title';
import CharactersManga from '@/Components/Molecules/CharactersManga';
import DetailsManga from '@/Components/Molecules/DetailsManga';
import ExpandableText from '@/Components/Molecules/ExpandableText';
import GuestLayout from '@/Layouts/GuestLayout';
import { cn } from '@/lib/utils';
import { Head, usePage } from '@inertiajs/react';

export default function Show() {
    const { manga, statistics: stats, characters } = usePage().props;

    const {
        title,
        cover_art: coverArt,
        thumbnail_sm: thumbnailSm,
        thumbnail_md: thumbnailMd,
        description,
        tags,
        original_title: originalTitle,
        attributes: { originalLanguage, status, publicationDemographic, year },
        info,
    } = manga;
    console.log({ stats, manga, characters });

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
                    <div className="relative -top-40">
                        <figure className="sticky top-5 min-w-44">
                            <img
                                src={thumbnailSm}
                                className="aspect-[17/26] w-64 rounded-sm border-4 border-plumpPurpleLight object-cover object-center transition-all duration-200 ease-linear"
                                alt="poster"
                            />
                        </figure>
                    </div>
                    <div className="flex flex-1 flex-col font-poppins">
                        <Title
                            className="line-clamp-2 text-plumpPurpleDark"
                            level={1}
                        >
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

                        <ExpandableText text={description} />
                    </div>
                    <div className="flex min-w-72 flex-col px-4 py-10 font-poppins text-sm text-plumpPurpleDark">
                        <div className="mb-6">
                            <h5 className="mb-2 text-lg font-bold">
                                Detalles del manga
                            </h5>
                            <DetailsManga data={info} />
                        </div>
                        <div>
                            <h5 className="mb-2 text-lg font-bold">
                                Personajes
                            </h5>
                            <CharactersManga characters={characters} />
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
