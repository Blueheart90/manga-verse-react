import GuestLayout from '@/Layouts/GuestLayout';
import { usePage } from '@inertiajs/react';

export default function Show() {
    const data = usePage().props;

    console.log({ data });

    return <GuestLayout>Show</GuestLayout>;
}
