import LoginForm from '@/Components/Organisms/LoginForm';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <div className="mx-auto mt-20 max-w-md bg-white p-6">
                <h3 className="text-center text-xl font-semibold uppercase text-plumpPurpleDark">
                    Iniciar sesión
                </h3>
                <LoginForm />
            </div>
        </GuestLayout>
    );
}
