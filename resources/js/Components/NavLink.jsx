import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`inline-flex items-center px-1 pt-1 text-base font-medium leading-5 transition duration-150 ease-in-out ${
                active ? 'text-turquoise' : 'text-white hover:text-turquoise'
            } ${className}`}
        >
            {children}
        </Link>
    );
}
