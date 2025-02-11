export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={`mb-2 text-xs uppercase text-plumpPurpleDark ${className}`}
        >
            {value ? value : children}
        </label>
    );
}
