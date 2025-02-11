export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `rounded bg-plumpPurpleDark px-4 py-2 uppercase text-white transition duration-150 ease-in-out hover:bg-plumpPurple ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
