import Header from '@/Components/Organisms/Header';
import { usePage } from '@inertiajs/react';

export default function GuestLayout({ children, className = '' }) {
    const { lastUpdateMangas, popularMangas, recentlyAdded, user } =
        usePage().props;
    return (
        <div className="min-h-screen bg-plumpPurple text-xl">
            <main className={`${className} `}>
                <Header user={user} className="container" />
                {children}
            </main>
        </div>
    );
}
