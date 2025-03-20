import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Arrow from '../Atoms/SvgIcons/Arrow';

export default function Paginate({ totalPages, currentPage, setCurrentPage }) {
    const [ArrPages, setArrPages] = useState([]);

    useEffect(() => {
        // Calcular el rango de páginas a mostrar
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + 4);

        // Ajustar el inicio si estamos cerca del final
        if (end === totalPages) {
            start = Math.max(1, end - 4);
        }

        // Crear el array de páginas
        const newPages = Array.from(
            { length: end - start + 1 },
            (_, i) => start + i,
        );

        setArrPages(newPages);
    }, [currentPage, totalPages]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSetCurrentPage = (page) => {
        setCurrentPage(page);
    };
    return (
        <div className="flex flex-col items-center">
            <div className="flex space-x-1 font-poppins">
                <button
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                    className="ml-2 min-w-9 rounded-md px-3 py-2 text-center text-sm shadow-md transition-all hover:bg-plumpPurple hover:text-plumpPurpleLight hover:shadow-lg focus:bg-plumpPurpleDark focus:text-white focus:shadow-none active:bg-plumpPurple active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    <Arrow direction="left" className="size-4" />
                </button>

                {ArrPages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handleSetCurrentPage(page)}
                        className={cn(
                            'ml-2 min-w-9 rounded-md px-3 py-2 text-center text-sm shadow-md transition-all hover:bg-plumpPurple hover:text-plumpPurpleLight hover:shadow-lg focus:bg-plumpPurpleDark focus:shadow-none active:bg-plumpPurple active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
                            page === currentPage
                                ? 'bg-plumpPurpleDark text-white'
                                : 'bg-plumpPurpleLight0 border border-transparent text-plumpPurpleDark',
                        )}
                    >
                        {page}
                    </button>
                ))}

                <button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                    className="ml-2 min-w-9 rounded-md px-3 py-2 text-center text-sm shadow-md transition-all hover:bg-plumpPurple hover:text-plumpPurpleLight hover:shadow-lg focus:bg-plumpPurpleDark focus:text-white focus:shadow-none active:bg-plumpPurple active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    <Arrow direction="right" className="size-4" />
                </button>
            </div>

            <div className="mt-2 text-sm text-plumpPurpleDark">
                <span className="font-semibold">Pag. {currentPage}</span> de{' '}
                <span className="font-semibold">{totalPages}</span>
            </div>
        </div>
    );
}
