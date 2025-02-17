import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import InputAvatar from '@/Components/Molecules/InputAvatar';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const [showRemovePreview, setShowRemovePreview] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const {
        data,
        setData,
        patch,
        post,
        delete: destroy,
        errors,
        processing,
        recentlySuccessful,
        progress,
        reset,
    } = useForm({
        name: user.name,
        email: user.email,
        photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        console.log('enviando', { data, selectedImage });

        // Crear un objeto FormData para enviar los datos
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);

        // Agrega la imagen solo si hay una nueva seleccionada
        if (selectedImage) {
            formData.append('photo', selectedImage);
            console.log('si cambio la imagen');
        } else {
            console.log('no cambio la imagen');
        }

        post(route('profile.update'), {
            body: formData,
            forceFormData: true,
            onSuccess: (page) => {
                setShowRemovePreview(false);
            },
        });
    };

    const deletePhoto = () => {
        console.log('eliminado foto', user.id);

        destroy(route('profile.delete.photo'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="photo" value="Profile Photo" />

                    <InputAvatar
                        setShowRemovePreview={setShowRemovePreview}
                        showRemovePreview={showRemovePreview}
                        // currentAvatar={`../storage/${user.profile_photo_path}`}
                        currentAvatar={`${user.profile_photo_url}`}
                        setData={setData}
                        onImageSelect={(file) => {
                            setSelectedImage(file);
                            setData('photo', file);
                        }}
                        reset={reset}
                    />
                    <button
                        type="button"
                        onClick={deletePhoto}
                        className="mt-2"
                    >
                        Eliminar foto
                    </button>

                    <InputError className="mt-2" message={errors.photo} />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton className="text-sm" disabled={processing}>
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
