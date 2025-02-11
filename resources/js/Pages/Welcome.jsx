import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <GuestLayout>
            <Head title="Welcome" />
        </GuestLayout>
    );
}
