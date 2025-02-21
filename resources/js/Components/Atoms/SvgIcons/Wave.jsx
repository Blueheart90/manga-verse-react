export default function Wave(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 150"
            {...props}
        >
            <path
                fill="currentColor"
                fill-opacity="1"
                d="M0,128L120,117.3C240,107,480,85,720,80C960,75,1200,85,1320,90.7L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
            ></path>
        </svg>
    );
}
