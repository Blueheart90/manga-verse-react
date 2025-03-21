import DisclosuresByVols from '../Molecules/DisclosuresByVols';
import Paginate from '../Molecules/Paginate';

export default function MangaByVols({
    volumes,
    setCurrentPage,
    currentPage,
    totalPages,
}) {
    return (
        <>
            <DisclosuresByVols volumes={volumes} />

            <Paginate
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    );
}
