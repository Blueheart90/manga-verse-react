import { useState } from 'react';
import useSWR from 'swr';
import Loading from '../Atoms/SvgIcons/Loading';
import MangaList from './MangaList';

export default function MangaViewer({ mangaId, type = 'volumes' }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState('asc');

    const limit = 100;
    const offset = (currentPage - 1) * limit;

    const strRoute = type === 'volumes' ? 'manga.volumes' : 'manga.chapters';

    const { data, error, isLoading } = useSWR(
        route(strRoute, { id: mangaId, limit, offset, order }),
        (url) => fetch(url).then((res) => res.json()),
    );

    const totalPages = Math.ceil(data?.total / limit);
    return (
        <div>
            {isLoading ? (
                <div className="flex h-dvh items-center justify-center">
                    <Loading className="size-20 text-plumpPurpleDark" />
                </div>
            ) : (
                <MangaList
                    data={data.data}
                    type={type}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    order={order}
                    setOrder={setOrder}
                />
            )}

            {error && <div>{error.message}</div>}
        </div>
    );
}
