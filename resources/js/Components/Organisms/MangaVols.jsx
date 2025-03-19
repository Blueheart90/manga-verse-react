import Disclosures from '../Molecules/Disclosures';
import Paginate from '../Molecules/Paginate';

export default function MangaVols({
    volumes,
    setCurrentPage,
    currentPage,
    totalPages,
}) {
    return (
        <>
            <Disclosures volumes={volumes} />

            <Paginate
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    );
}
