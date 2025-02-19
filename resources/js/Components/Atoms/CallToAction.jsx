import { twMerge } from 'tailwind-merge';

export default function CallToAction({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            className={twMerge(
                'rounded bg-gold px-4 py-2 uppercase text-black transition duration-150 ease-in-out hover:scale-105',
                `${disabled && 'opacity-25'}`,
                className,
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
