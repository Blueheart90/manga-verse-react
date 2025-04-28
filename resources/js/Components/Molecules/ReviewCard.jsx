import { customStyles } from '@/lib/ratingStyles';
import { cn } from '@/lib/utils';
import { Rating } from '@smastrom/react-rating';
import { formatDistanceToNow } from 'date-fns';
import es from 'date-fns/locale/es';
import DOMPurify from 'dompurify';
import Avatar from '../Atoms/Avatar';
import Recommended from './Recommended';

export default function ReviewCard({ review, className = '' }) {
    const timeAgo = formatDistanceToNow(new Date(review.created_at), {
        addSuffix: true,
        locale: es,
    });

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html),
        };
    };
    return (
        <div
            className={cn(
                'divide-y divide-plumpPurpleLight rounded-md border border-plumpPurpleDark p-6 shadow-md',
                className,
            )}
        >
            <div className="mb-4 flex items-center justify-between text-plumpPurpleDark">
                <div className="flex items-center gap-2">
                    <Avatar
                        src={review.user.profile_photo_url}
                        className="size-14 shadow-sm"
                        alt="avatar"
                    />
                    <div className="flex flex-col font-sintony">
                        <span className="text-base font-bold">
                            {review.user.name}
                        </span>
                        <span className="text-xs text-plumpPurple">
                            {timeAgo}
                        </span>
                    </div>
                </div>
                <Recommended vote={review.recommended} />
            </div>
            <div>
                <div className="mb-2 mt-4 flex items-center gap-2">
                    <Rating
                        itemStyles={customStyles}
                        className="max-w-28"
                        value={review.rating}
                        readOnly
                    />
                    <span className="font-sintony text-sm font-bold text-plumpPurpleDark">
                        {review.rating}/5
                    </span>
                </div>
                <h6 className="mb-1 font-sintony text-base font-semibold text-plumpPurpleDark">
                    {review.title}
                </h6>

                <p
                    className="text-base text-plumpPurpleDark"
                    dangerouslySetInnerHTML={createMarkup(review.content)}
                ></p>
            </div>
        </div>
    );
}
