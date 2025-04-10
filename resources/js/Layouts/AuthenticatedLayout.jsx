import Header from '@/Components/Organisms/Header';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster } from 'sonner';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-white">
            <Header user={user} />

            <main>
                <Toaster />
                {children}
            </main>
        </div>
    );
}
