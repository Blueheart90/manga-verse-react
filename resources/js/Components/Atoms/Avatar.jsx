import { cn } from '@/lib/utils';

export default function Avatar({
    className,
    src,
    alt,
    // fallBackSrc = 'https://ui-avatars.com/api/?name=pt+Doe&background=random',
}) {
    return (
        <img
            className={cn(
                'size-28 rounded-full border-2 border-plumpPurpleDark ' +
                    className,
            )}
            src={src}
            alt={alt}
            // onError={(e) => (e.currentTarget.src = fallBackSrc)}
        />
    );
}
