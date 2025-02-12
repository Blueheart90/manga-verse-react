import RegisterForm from '@/Components/Organisms/RegisterForm';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Register() {
    const { errors } = usePage().props;
    // console.log({ errors });

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="mx-auto mt-20 max-w-md bg-white p-6">
                <h3 className="text-center text-xl font-semibold uppercase text-plumpPurpleDark">
                    Registrar
                </h3>
                <RegisterForm />
            </div>
        </GuestLayout>
    );
}
