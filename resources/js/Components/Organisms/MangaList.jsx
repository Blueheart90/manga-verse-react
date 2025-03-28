import DisclosuresByChaps from '../Molecules/DisclosuresByChaps';
import DisclosuresByVols from '../Molecules/DisclosuresByVols';
import OrderInput from '../Molecules/OrderInput';
import Paginate from '../Molecules/Paginate';

export default function MangaList({
    data,
    type = 'volumes',
    setCurrentPage,
    currentPage,
    totalPages,
    order,
    setOrder,
}) {
    const DisclosureComponent =
        type === 'volumes' ? DisclosuresByVols : DisclosuresByChaps;

    return (
        <>
            <div className="my-4 flex items-center justify-end gap-2 text-plumpPurpleDark">
                <span className="text-sm">Ordenar en:</span>
                <OrderInput
                    order={order}
                    onChange={(newOrder, newPage) => {
                        setOrder(newOrder);
                        setCurrentPage(newPage);
                    }}
                />
            </div>
            <DisclosureComponent data={data} />
            <Paginate
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    );
}
