import { Link } from '@inertiajs/react';
import { twMerge } from 'tailwind-merge';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    const baseClasses =
        'flex w-full items-center border border-transparent gap-3 rounded-[5px] py-3 pe-4 ps-3 text-base font-medium transition-all duration-150 ease-in-out focus:outline-none';

    const activeClasses = active
        ? 'bg-plumpPurpleDark text-white'
        : 'text-plumpPurpleDark';

    const combinedClasses = twMerge(baseClasses, activeClasses, className);
    return (
        <Link className={combinedClasses} {...props}>
            {children}
        </Link>
    );
}
