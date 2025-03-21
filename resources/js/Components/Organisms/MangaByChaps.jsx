import DisclosuresByChaps from '../Molecules/DisclosuresByChaps';
import Paginate from '../Molecules/Paginate';

export default function MangaByChaps({
    chapters,
    setCurrentPage,
    currentPage,
    totalPages,
}) {
    return (
        <>
            <DisclosuresByChaps chapters={chapters} />
            <Paginate
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    );
}
