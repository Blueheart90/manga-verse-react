export default function Arrow({ direction = 'right', ...props }) {
    const rotationAngles = {
        right: 0, // Por defecto, apunta a la derecha
        left: 180, // Apunta a la izquierda
        up: -90, // Apunta hacia arriba
        down: 90, // Apunta hacia abajo
    };

    const rotation = rotationAngles[direction] || 0; // Fallback a 'right' si la dirección no es válida

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24" // Clase para aplicar transformaciones
            className="size-6"
            style={{ rotate: `${rotation}deg` }} // Aplicar la rotación
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
        </svg>
    );
}
