import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';

export default function StatusList({ statusColors, data, className }) {
    const { auth, filters } = usePage().props;

    console.log({ filters });
    const statusCountsArray = Object.entries(data).map(([status, count]) => ({
        status,
        count,
    }));

    return (
        <div>
            <ul
                className={cn(
                    'space-y-2 rounded-md bg-white p-3 text-base',
                    className,
                )}
            >
                <li>
                    <button
                        className={cn(
                            'flex w-full items-center justify-between rounded-md border border-transparent bg-plumpPurpleLight px-4 py-2 text-plumpPurpleDark',
                            !filters.status && 'border-plumpPurpleDark',
                        )}
                        onClick={() =>
                            router.get(
                                route('users.library.index', {
                                    user: auth.user.id,
                                }),
                            )
                        }
                    >
                        <span className="">Total de mangas</span>
                        <span className="">
                            {statusCountsArray.reduce(
                                (total, item) => total + item.count,
                                0,
                            )}
                        </span>
                    </button>
                </li>
                {statusCountsArray.map((item, index) => (
                    <li key={index}>
                        <button
                            className={cn(
                                'flex w-full items-center justify-between rounded-md border border-transparent bg-plumpPurpleLight px-4 py-2 text-plumpPurpleDark',
                                statusColors[item.status],
                                filters.status === item.status &&
                                    'border-plumpPurpleDark',
                            )}
                            onClick={() =>
                                router.get(
                                    route('users.library.index', {
                                        user: auth.user.id,
                                        status: item.status,
                                    }),
                                )
                            }
                        >
                            <span>{item.status}</span>
                            <span>{item.count}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
