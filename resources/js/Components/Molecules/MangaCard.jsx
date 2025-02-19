import CallToAction from '../Atoms/CallToAction';
import Document from '../Atoms/SvgIcons/Document';
import Glasses from '../Atoms/SvgIcons/Glasses';
import Globe from '../Atoms/SvgIcons/Globe';
import Info from '../Atoms/SvgIcons/Info';
import SecondaryButton from '../SecondaryButton';

export default function MangaCard({ manga }) {
    const {
        id,
        title,
        'thumbnail-sm': thumbnailSm,
        'thumbnail-md': thumbnailMd,
        'title-spa': titleSpa,
        attributes: { availableTranslatedLanguages, lastChapter, lastVolume },
    } = manga;
    return (
        <div className="group relative flex aspect-[7/10] h-64 w-[216px] cursor-pointer">
            <div className="flex items-center gap-2 bg-gradient-to-t from-plumpPurple to-plumpPurpleDark px-1 py-4 text-left font-poppins text-lg text-white [writing-mode:sideways-lr]">
                <span className="text-2xl font-bold">01</span>
                <p className="truncate">{title}</p>
            </div>
            <div className="relative overflow-hidden">
                <img
                    src={thumbnailSm}
                    className="aspect-[7/10] w-44 object-cover object-center transition-all duration-200 ease-linear"
                    alt="poster"
                />

                <div className="absolute inset-0 flex scale-125 flex-col justify-between bg-white/90 p-3 opacity-0 transition-all delay-100 duration-200 group-hover:scale-100 group-hover:opacity-100">
                    <section>
                        <h6 className="mb-1 truncate text-sm font-bold text-black">
                            {title}
                        </h6>
                        <div className="flex items-center gap-1 text-sm">
                            <Globe className="size-4" />
                            <span className="max-w-32 truncate capitalize">
                                {availableTranslatedLanguages.join('/')}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            <Document className="size-4" />
                            <strong>Cap. {lastChapter}</strong>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            <Document className="size-4" />
                            <strong>Vol. {lastVolume}</strong>
                        </div>
                    </section>
                    <div className="space-y-1">
                        <CallToAction className="flex w-full items-center justify-center gap-1 p-[6px] text-sm capitalize">
                            <Glasses className="size-4" />
                            Leer Ahora
                        </CallToAction>
                        <SecondaryButton className="flex w-full items-center justify-center gap-1 p-[6px] text-sm capitalize">
                            <Info className="size-4" />
                            Info
                        </SecondaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
