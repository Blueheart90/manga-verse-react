import { cn } from '@/lib/utils';
import { useState } from 'react';
import Like from '../Atoms/SvgIcons/Like';

export default function DataTableTest({
    data,
    headers,
    statusColors,
    className,
}) {
    const [items, setItems] = useState(data);

    return (
        <div className="h-fit w-full overflow-x-auto rounded-md shadow">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-plumpPurple/80">
                    <tr>
                        <th
                            scope="col"
                            className="w-full px-6 py-3 text-left text-sm font-medium tracking-wider text-plumpPurpleLight"
                        >
                            Nombre del Manga
                        </th>
                        <th
                            scope="col"
                            className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium tracking-wider text-plumpPurpleLight"
                        >
                            Recomendado
                        </th>
                        <th
                            scope="col"
                            className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium tracking-wider text-plumpPurpleLight"
                        >
                            Estado
                        </th>
                        <th
                            scope="col"
                            className="whitespace-nowrap px-6 py-3 text-left text-sm font-medium tracking-wider text-plumpPurpleLight"
                        >
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <div className="inline-flex items-center gap-x-3">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-blue-500"
                                    />

                                    <div className="flex gap-x-2">
                                        <img
                                            className="aspect-[17/26] w-12 rounded-sm object-contain object-top"
                                            src={item.manga.cover_url}
                                            alt={item.manga.title}
                                        />
                                        <div className="flex flex-col justify-between py-1">
                                            <h2 className="text-base text-plumpPurpleDark">
                                                {item.manga.title}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">
                                <div
                                    className={cn(
                                        'mx-auto w-10 rounded-full p-2',
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
                            <td className="whitespace-nowrap px-6 py-4">
                                <span
                                    className={cn(
                                        'inline-flex rounded-full px-3 py-1 text-sm font-semibold capitalize',
                                        statusColors[item.status],
                                    )}
                                >
                                    {item.status}
                                </span>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
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

            {items.length == 0 && (
                <div className="bg-white p-10">
                    <div className="mb-4 flex items-center justify-center gap-4">
                        <p className="text-xl text-plumpPurpleDark">
                            No hay listas disponibles.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
