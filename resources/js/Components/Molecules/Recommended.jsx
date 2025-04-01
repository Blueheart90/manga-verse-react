import { cn } from '@/lib/utils';
import Like from '../Atoms/SvgIcons/Like';

export default function Recommended({ vote, className = '' }) {
    return (
        <div
            className={cn(
                'flex size-10 flex-col items-center justify-center gap-2 overflow-hidden rounded-full border text-sm shadow-sm',
                vote
                    ? 'border-green-400 text-green-400'
                    : 'rotate-180 border-red-400 text-red-400',
                className,
            )}
        >
            <Like className="size-6" />
        </div>
    );
}
