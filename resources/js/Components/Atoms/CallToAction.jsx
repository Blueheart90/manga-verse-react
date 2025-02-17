export default function CallToAction({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `bg-gold rounded px-4 py-2 uppercase text-black transition duration-150 ease-in-out hover:scale-105 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
