import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useField } from 'formik';
import { useState } from 'react';

const getRating = (rating) => {
    switch (rating) {
        case 1:
            return 'Poor';
        case 2:
            return 'Nothing special';
        case 3:
            return 'Average';
        case 4:
            return 'Very good';
        case 5:
            return 'Excellent';
        default:
            return 'None';
    }
};

const star = (
    <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
    />
);

const customStyles = {
    itemShapes: star,
    activeFillColor: '#5A2494',
    inactiveFillColor: '#F5EFFB',
    inactiveStrokeColor: 'yellow',
    activeStrokeColor: 'yellow',
};
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
