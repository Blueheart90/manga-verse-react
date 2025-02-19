import { twMerge } from 'tailwind-merge';
import CallToAction from '../Atoms/CallToAction';
import Flag from '../Atoms/Flag';
import Tags from '../Atoms/Tags';
import SecondaryButton from '../SecondaryButton';

export default function Card({ manga, className = '' }) {
    console.log(manga);

    const {
        id,
        title,
        'cover-art': coverArt,
        'thumbnail-sm': thumbnailSm,
        'thumbnail-md': thumbnailMd,
        description,
        tags,
        'title-spa': titleSpa,
        attributes: { originalLanguage },
    } = manga;

    const baseClasses =
        ' px-8 flex items-center justify-between overflow-hidden h-52 md:h-72 lg:h-96  min-h-fit relative bg-center bg-cover';
    const combinedClasses = twMerge(baseClasses, className);
    return (
        <div
            className={combinedClasses}
            style={{
                backgroundImage: `linear-gradient(59deg, rgba(18,6,46,0.7987570028011204) 40%, rgba(255,255,255,0.4009978991596639) 60%, rgba(32,35,79,0.7987570028011204) 80%), url(${coverArt})`,
            }}
        >
            <div className="w-1/2 md:w-3/5 lg:w-1/2">
                {manga.attributes.lastChapter && (
                    <h4 className="text-sm text-white lg:text-base">
                        {`Capitulo: ${manga.attributes.lastChapter}`}
                    </h4>
                )}

                <a href="" className="mb-4 block text-white">
                    <h3 className="line-clamp-2 text-xl font-semibold capitalize lg:text-3xl">
                        {title}
                    </h3>
                    {titleSpa && (
                        <span className="hidden text-sm italic md:block">
                            {titleSpa}
                        </span>
                    )}
                </a>
                <p className="mb-8 hidden text-sm leading-5 text-white md:line-clamp-3 lg:text-base">
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
            <div className="absolute -right-[2%] xl:right-[8%]">
                <a href="#" className="">
                    <img
                        src={coverArt}
                        className="aspect-[7/10] w-72 rotate-[15deg] border-[10px] border-white object-cover object-center shadow-2xl shadow-slate-950 transition-all duration-200 ease-linear hover:rotate-[18deg] hover:scale-105 lg:w-96 xl:w-[400px]"
                        alt="poster"
                    />
                    {/* <img
                            src={coverArt}
                            className="w-72 rotate-[15deg] border-[10px] border-white object-cover shadow-2xl shadow-slate-950 transition-all duration-200 ease-linear hover:rotate-[18deg] hover:scale-105 lg:w-96 xl:w-[400px]"
                            alt="poster"
                        /> */}
                </a>
            </div>
            <Flag
                className="absolute bottom-2 right-4 m-0 w-12"
                lang={originalLanguage}
            />
        </div>
    );
}
