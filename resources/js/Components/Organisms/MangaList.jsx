import DisclosuresByChaps from '../Molecules/DisclosuresByChaps';
import DisclosuresByVols from '../Molecules/DisclosuresByVols';
import Paginate from '../Molecules/Paginate';

export default function MangaList({
    data,
    type = 'volumes',
    setCurrentPage,
    currentPage,
    totalPages,
}) {
    const DisclosureComponent =
        type === 'volumes' ? DisclosuresByVols : DisclosuresByChaps;

    return (
        <>
            <DisclosureComponent data={data} />
            <Paginate
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    );
}
