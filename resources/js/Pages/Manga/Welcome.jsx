import Card from '@/Components/Molecules/Card';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { lastUpdateMangas, popularMangas, recentlyAdded } = usePage().props;

    return (
        <GuestLayout>
            <Head title="Welcome" />
            <Card manga={lastUpdateMangas[0]} />
        </GuestLayout>
    );
}
