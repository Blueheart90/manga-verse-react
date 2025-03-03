import { twMerge } from 'tailwind-merge';

export default function Tags({ tags, className = '' }) {
    return (
        <>
            {tags.map((tag, index) => (
                <span
                    key={index}
                    className={twMerge(
                        'rounded border border-white px-2 py-1 text-xs text-white',
                        className,
                    )}
                >
                    {tag}
                </span>
            ))}
        </>
    );
}
