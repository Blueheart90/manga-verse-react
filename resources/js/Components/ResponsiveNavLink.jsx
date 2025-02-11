import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-center gap-3 rounded-[5px] border border-transparent py-3 pe-4 ps-3 text-sm ${
                active
                    ? 'bg-plumpPurpleDark text-white'
                    : 'text-plumpPurpleDark hover:bg-plumpPurpleDark hover:text-white'
            } text-base font-medium transition-all duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
