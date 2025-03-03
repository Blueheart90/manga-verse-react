import Header from '@/Components/Organisms/Header';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

export default function GuestLayout({ children, className = '' }) {
    const { lastUpdateMangas, popularMangas, recentlyAdded, user } =
        usePage().props;
    return (
        <div className={cn('min-h-screen bg-plumpPurple text-xl', className)}>
            <Header user={user} />
            <main>{children}</main>
        </div>
    );
}
