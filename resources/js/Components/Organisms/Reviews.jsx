import axios from 'axios';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReviewCard from '../Molecules/ReviewCard';

export default function Reviews({ mangaId, reviews, setReviews }) {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreReviews = async () => {
        const response = await axios.get(`/manga/${mangaId}/reviews`, {
            params: { page, limit: 10 },
        });

        setReviews((prev) => [...prev, ...response.data.data]);
        setPage((prev) => prev + 1);
        setHasMore(response.data.hasMore);
    };

    return (
        <InfiniteScroll
            dataLength={reviews.length}
            next={fetchMoreReviews}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} className="mb-4" />
            ))}
        </InfiniteScroll>
    );
}
