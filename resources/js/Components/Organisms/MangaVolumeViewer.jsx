import { useState } from 'react';
import useSWR from 'swr';
import Loading from '../Atoms/SvgIcons/Loading';
import MangaByVols from './MangaByVols';

export default function MangaVolumeViewer({ mangaId }) {
    const [currentPage, setCurrentPage] = useState(1);

    const limit = 100;
    const offset = (currentPage - 1) * limit;

    const {
        data: chapters,
        error,
        isLoading,
    } = useSWR(route('manga.chapters', { id: mangaId, limit, offset }), (url) =>
        fetch(url).then((res) => res.json()),
    );

    const totalPages = Math.ceil(chapters?.total / limit);
    return (
        <div>
            {isLoading ? (
                <div className="flex h-dvh items-center justify-center">
                    <Loading className="size-20 text-plumpPurpleDark" />
                </div>
            ) : (
                <MangaByVols
                    volumes={chapters.data}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            )}

            {error && <div>{error.message}</div>}
        </div>
    );
}
