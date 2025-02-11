import Header from '@/Components/Organisms/Header';
import { usePage } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    const user = usePage().props.auth.user;
    return (
        <div className="min-h-screen bg-gray-100">
            <Header user={user} />

            <main>{children}</main>
        </div>
    );
}
