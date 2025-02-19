import { twMerge } from 'tailwind-merge';

export default function AboutUs({ className = '' }) {
    const baseClasses = 'text-base text-white';
    const combinedClasses = twMerge(baseClasses, className);
    return (
        <p className={combinedClasses}>
            <strong>MangaVerse</strong> es un proyecto de lectura de manga que
            aprovecha la poderosa API de{' '}
            <a
                className="font-semibold"
                target="_blank"
                rel="noopener noreferrer"
                href="https://mangadex.org/"
            >
                MangaDex
            </a>
            , una de las plataformas más populares y completas del mundo del
            manga en línea. Inspirado en la filosofía abierta y comunitaria de
            MangaDex, MangaVerse permite a los usuarios acceder a una amplia
            variedad de títulos en múltiples idiomas, brindando una experiencia
            personalizada y accesible para los fans del manga.
        </p>
    );
}
