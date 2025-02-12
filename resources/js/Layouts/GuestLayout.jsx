import Header from '@/Components/Organisms/Header';
import { usePage } from '@inertiajs/react';

export default function GuestLayout({ children, className }) {
    const user = usePage().props.auth.user;
    return (
        <div className="my-auto min-h-screen bg-gray-100">
            <Header user={user} />

            <main className={` ${className} `}>{children}</main>
        </div>
    );
}
