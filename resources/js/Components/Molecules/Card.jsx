import { twMerge } from 'tailwind-merge';
import CallToAction from '../Atoms/CallToAction';
import Tags from '../Atoms/Tags';
import SecondaryButton from '../SecondaryButton';

export default function Card({ manga, className = '' }) {
    console.log(manga);

    const {
        id,
        title,
        'cover-art': coverArt,
        description,
        tags,
        'title-spa': titleSpa,
    } = manga;

    const baseClasses =
        ' py-2 px-8 flex items-center justify-between overflow-hidden h-52 md:h-64 lg:h-80  min-h-fit relative bg-center bg-cover';
    const combinedClasses = twMerge(baseClasses, className);
    return (
        <>
            <div
                className={combinedClasses}
                style={{
                    // filter: 'blur(8px)',
                    backgroundImage: `linear-gradient(59deg, rgba(18,6,46,0.7987570028011204) 40%, rgba(255,255,255,0.4009978991596639) 60%, rgba(32,35,79,0.7987570028011204) 80%), url(${coverArt})`,
                }}
            >
                <div className="w-1/2 md:w-3/5 lg:w-1/2">
                    {manga.attributes.lastChapter && (
                        <h4 className="text-white">
                            {`Capitulo: ${manga.attributes.lastChapter}`}
                        </h4>
                    )}

                    <a href="" className="text-white">
                        <h3 className="mb-4 text-xl font-semibold uppercase">
                            {title}
                            {titleSpa && (
                                <span className="hidden text-sm capitalize italic md:block">
                                    {titleSpa}
                                </span>
                            )}
                        </h3>
                    </a>
                    <p className="mb-8 hidden leading-5 text-white md:line-clamp-3">
                        {description}
                    </p>
                    <Tags className="mb-5 hidden lg:flex" tags={tags} />
                    <div className="flex gap-2">
                        <CallToAction className="py-2 font-poppins text-sm capitalize">
                            Leer ahora
                        </CallToAction>
                        <SecondaryButton className="py-2 font-poppins text-sm capitalize">
                            Ver información
                        </SecondaryButton>
                    </div>
                </div>
                <div className="absolute -right-[2%] -top-1/4 xl:right-[8%]">
                    <a href="#" className="">
                        <img
                            src={coverArt}
                            className="w-72 rotate-[15deg] border-[10px] border-white shadow-2xl shadow-slate-950 lg:w-96 xl:w-[400px]"
                            alt="poster"
                        />
                    </a>
                </div>
            </div>
        </>
    );
}
