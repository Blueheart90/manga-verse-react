export default function Check(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="size-6"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
            />
        </svg>
    );
}
