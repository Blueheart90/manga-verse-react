import { cn } from '@/lib/utils';
import { useState } from 'react';
import Like from '../Atoms/SvgIcons/Like';

export default function DataTable({ data, headers, statusColors, className }) {
    const [items, setItems] = useState(data);

    return (
        <section className={cn('w-full', className)}>
            <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800">
                    Team members
                </h2>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600">
                    100 users
                </span>
            </div>

            <div className="mt-6 flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="w-full table-auto border-collapse divide-y divide-gray-200">
                                <thead className="bg-plumpPurple/80">
                                    <tr>
                                        <th scope="col"></th>
                                        {headers.map((header, index) => (
                                            <th
                                                key={index}
                                                scope="col"
                                                className="px-4 py-3.5 text-left text-sm font-normal text-plumpPurpleLight rtl:text-right"
                                            >
                                                <div className="flex items-center gap-x-3">
                                                    <span>{header}</span>
                                                </div>
                                            </th>
                                        ))}
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {items.map((item, index) => (
                                        <tr key={index}>
                                            <td
                                                className={cn(
                                                    'w-1',
                                                    statusColors[item.status][
                                                        'bg'
                                                    ],
                                                )}
                                            ></td>
                                            <td className="whitespace-nowrap border border-gray-200 px-4 py-4 text-sm font-medium text-gray-700">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-blue-500"
                                                    />

                                                    <div className="flex gap-x-2">
                                                        <img
                                                            className="aspect-[17/26] w-12 rounded-sm object-cover"
                                                            src={
                                                                item.manga
                                                                    .cover_url
                                                            }
                                                            alt={
                                                                item.manga.title
                                                            }
                                                        />
                                                        <div className="flex flex-col justify-between py-1">
                                                            <h2 className="text-sm text-plumpPurpleDark">
                                                                {
                                                                    item.manga
                                                                        .title
                                                                }
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap border border-gray-200 px-4 py-4 text-sm text-gray-500">
                                                <div
                                                    className={cn(
                                                        'w-10 rounded-full p-2',
                                                        item.recommended
                                                            ? 'bg-green-100'
                                                            : 'bg-red-100',
                                                    )}
                                                >
                                                    <Like
                                                        className={cn(
                                                            'w-6',
                                                            item.recommended
                                                                ? 'text-green-500'
                                                                : 'rotate-180 text-red-500',
                                                        )}
                                                    />
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap border border-gray-200 px-4 py-4 text-sm text-gray-500">
                                                {item.status}
                                            </td>

                                            <td className="whitespace-nowrap border border-gray-200 px-4 py-4 text-sm">
                                                <div className="flex items-center gap-x-6">
                                                    <button className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none dark:text-gray-300 dark:hover:text-red-500">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="h-5 w-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                            />
                                                        </svg>
                                                    </button>

                                                    <button className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none dark:text-gray-300 dark:hover:text-yellow-500">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="h-5 w-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <a
                    href="#"
                    className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 rtl:-scale-x-100"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                        />
                    </svg>

                    <span>previous</span>
                </a>

                <div className="hidden items-center gap-x-3 lg:flex">
                    <a
                        href="#"
                        className="rounded-md bg-blue-100/60 px-2 py-1 text-sm text-blue-500 dark:bg-gray-800"
                    >
                        1
                    </a>
                    <a
                        href="#"
                        className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
                    >
                        2
                    </a>
                    <a
                        href="#"
                        className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
                    >
                        3
                    </a>
                    <a
                        href="#"
                        className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        ...
                    </a>
                    <a
                        href="#"
                        className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        12
                    </a>
                    <a
                        href="#"
                        className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        13
                    </a>
                    <a
                        href="#"
                        className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        14
                    </a>
                </div>

                <a
                    href="#"
                    className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                    <span>Next</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 rtl:-scale-x-100"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                    </svg>
                </a>
            </div>
        </section>
    );
}
