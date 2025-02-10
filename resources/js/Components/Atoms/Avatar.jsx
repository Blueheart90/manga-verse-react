export default function Avatar({
    className,
    src,
    alt,
    // fallBackSrc = 'https://ui-avatars.com/api/?name=pt+Doe&background=random',
}) {
    return (
        <img
            className={
                'h-28 w-28 rounded-full border-2 border-plumpPurpleDark ' +
                className
            }
            src={src}
            alt={alt}
            // onError={(e) => (e.currentTarget.src = fallBackSrc)}
        />
    );
}
