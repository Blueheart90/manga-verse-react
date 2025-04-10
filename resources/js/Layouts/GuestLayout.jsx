import Header from '@/Components/Organisms/Header';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { Toaster } from 'sonner';

export default function GuestLayout({ children, className = '' }) {
    const { lastUpdateMangas, popularMangas, recentlyAdded, auth } =
        usePage().props;
    return (
        <div className={cn('min-h-screen bg-plumpPurple text-xl', className)}>
            <Header user={auth.user} />
            <main>
                <Toaster />
                {children}
            </main>
        </div>
    );
}
