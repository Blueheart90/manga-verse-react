import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import es from 'date-fns/locale/es';
import Avatar from '../Atoms/Avatar';
import Recommended from './Recommended';

export default function ReviewCard({ review, className = '' }) {
    const timeAgo = formatDistanceToNow(new Date(review.created_at), {
        addSuffix: true,
        locale: es,
    });
    return (
        <div
            className={cn(
                'rounded-md border border-plumpPurpleDark p-4 shadow-md',
                className,
            )}
        >
            <div className="mb-2 flex justify-between text-plumpPurpleDark">
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
            <h6 className="mb-1 font-sintony text-base font-semibold text-plumpPurpleDark">
                {review.title}
            </h6>
            <p className="text-base text-plumpPurpleDark">{review.content}</p>
        </div>
    );
}
