import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Arrow from '../Atoms/SvgIcons/Arrow';

export default function Paginate({ totalPages, currentPage, setCurrentPage }) {
    const [ArrPages, setArrPages] = useState([]);

    useEffect(() => {
        // Devulve un array de 7 o menos dependiendo del numero de paginas totales
        if (totalPages <= 4) {
            setArrPages(Array.from({ length: totalPages }, (_, i) => i + 1));
        } else {
            setArrPages(Array.from({ length: 5 }, (_, i) => i + 1));
        }
    }, [totalPages]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            const firstPageIndex = ArrPages[0];
            const currentPageIndex = ArrPages.indexOf(currentPage);

            if (currentPageIndex > 2) {
                setCurrentPage(currentPage - 1);
            } else if (firstPageIndex > 1) {
                setCurrentPage(currentPage - 1);
                setArrPages(ArrPages.map((page) => page - 1));
            } else {
                setCurrentPage(currentPage - 1);
            }
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const currentPageIndex = ArrPages.indexOf(currentPage);
            const isLastPage = ArrPages[ArrPages.length - 1] === totalPages;

            if (currentPageIndex < 2) {
                setCurrentPage(currentPage + 1);
            } else if (!isLastPage) {
                setArrPages(ArrPages.map((page) => page + 1));
                setCurrentPage(currentPage + 1);
            } else {
                setCurrentPage(currentPage + 1);
            }
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
