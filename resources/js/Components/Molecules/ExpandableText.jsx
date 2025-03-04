import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

export default function ExpandableText({ text, className }) {
    const [showMore, setShowMore] = useState(false);
    const textRef = useRef(null);

    // Estado para determinar si el texto necesita ser truncado
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        const paragraph = textRef.current;

        if (paragraph) {
            // Comprobamos si el texto excede el número de líneas permitido
            const isOverflowing =
                paragraph.scrollHeight > paragraph.clientHeight;

            setIsTruncated(isOverflowing);
        }
    }, [text]);

    return (
        <div className={cn('text-plumpPurpleDark', className)}>
            {/* Descripción */}
            <p
                ref={textRef}
                className={cn(
                    'mb-4 font-poppins text-sm leading-5 lg:text-base',
                    !showMore && 'line-clamp-3',
                )}
            >
                {text}
            </p>

            {/* Botón "Show more" solo si el texto está truncado */}
            {isTruncated && (
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="text-sm font-medium underline transition-colors hover:text-plumpPurple"
                >
                    {showMore ? 'Leer menos' : 'Leer más'}
                </button>
            )}
        </div>
    );
}
