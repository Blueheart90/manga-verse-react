export default function Flag({ flag, lang, ...props }) {
    const languageFlags = {
        ja: 'jp',
        ko: 'kr',
        en: 'us',
        es: 'es',
        fr: 'fr',
        cn: 'cn',
        tw: 'tw',
    };
    const flagCode = languageFlags[lang] || 'us';
    const urlFlag = `https://mangadex.org/img/flags/${flag ?? flagCode}.svg`;

    return <img src={urlFlag} {...props} />;
}
