import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import NoLogging from '../Molecules/NoLogging';
import ReviewForm from './ReviewForm';
import Reviews from './Reviews';

export default function ReviewSection({ className = '', id }) {
    const { auth } = usePage().props;

    const [reviews, setReviews] = useState([]);
    return (
        <section className={cn('mt-6', className)}>
            {auth?.user ? (
                <ReviewForm setReviews={setReviews} reviews={reviews} />
            ) : (
                <NoLogging>
                    Debes iniciar sesión para hacer una reseña
                </NoLogging>
            )}

            <h5 className="mb-2 mt-8 text-2xl font-bold text-plumpPurpleDark">
                Reseñas
            </h5>
            <Reviews mangaId={id} reviews={reviews} setReviews={setReviews} />
        </section>
    );
}
