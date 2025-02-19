import { twMerge } from 'tailwind-merge';

export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={twMerge(
                'rounded bg-white px-4 py-2 uppercase text-black transition duration-150 ease-in-out',
                `${disabled && 'opacity-25'}`,
                className,
            )}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
