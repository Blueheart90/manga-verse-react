export default function ArrowCorner(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            {...props}
        >
            <path d="m15 10 5 5-5 5" />
            <path d="M4 4v7a4 4 0 0 0 4 4h12" />
        </svg>
    );
}
