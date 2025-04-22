import { customStyles } from '@/lib/ratingStyles';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useField } from 'formik';
import { useState } from 'react';

export default function RatingInput({ name, disabled = false }) {
    const [field, meta, helpers] = useField(name);
    const [hoveredRating, setHoveredRating] = useState(0);
    return (
        <div className="mb-4 flex w-full max-w-32 flex-col items-center gap-2">
            <Rating
                itemStyles={customStyles}
                value={meta.value}
                onChange={(value) => {
                    helpers.setValue(value);
                }}
                onHoverChange={setHoveredRating}
                isDisabled={disabled}
            />
        </div>
    );
}
