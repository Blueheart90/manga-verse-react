import axios from 'axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Atoms/SvgIcons/Loading';
import ReviewCard from '../Molecules/ReviewCard';

export default function Reviews({ mangaId, reviews, setReviews }) {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Carga inicial
    useEffect(() => {
        const fetchInitialReviews = async () => {
            setIsLoading(true);
            const response = await axios.get(`/manga/${mangaId}/reviews`, {
                params: { page: 1, limit: 10 },
            });
            setReviews(response.data.data);
            setHasMore(response.data.hasMore);
            setIsLoading(false);
            setHasLoaded(true);
            setPage(2);
        };
        fetchInitialReviews();
    }, [mangaId, setReviews]);

    // Paginación
    const fetchMoreReviews = async () => {
        setIsLoading(true);
        const response = await axios.get(`/manga/${mangaId}/reviews`, {
            params: { page, limit: 10 },
        });
        setReviews((prev) => [...prev, ...response.data.data]);
        setHasMore(response.data.hasMore);
        setIsLoading(false);
        setPage((prev) => prev + 1);
    };

    return (
        <>
            {reviews.length > 0 ? (
                <InfiniteScroll
                    dataLength={reviews.length}
                    next={fetchMoreReviews}
                    hasMore={hasMore}
                    loader={
                        <div className="flex items-center justify-center py-10">
                            <Loading className="size-20 text-plumpPurpleDark" />
                        </div>
                    }
                >
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            className="mb-4"
                        />
                    ))}
                </InfiniteScroll>
            ) : (
                !isLoading &&
                hasLoaded && (
                    <div className="rounded-md bg-plumpPurpleLight p-10">
                        <div className="mb-4 flex items-center justify-center gap-4">
                            <p className="font-poppins text-lg text-plumpPurpleDark">
                                Aún no hay reseñas disponibles, sé el primero en
                                dar tu opinión.
                            </p>
                        </div>
                    </div>
                )
            )}
        </>
    );
}
