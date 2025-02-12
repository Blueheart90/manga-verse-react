export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={`rounded border-plumpPurple text-plumpPurpleDark focus:ring-0 ${className}`}
        />
    );
}
