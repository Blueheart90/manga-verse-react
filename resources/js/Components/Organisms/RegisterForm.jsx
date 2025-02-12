import { useForm } from '@inertiajs/react';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import PrimaryButton from '../PrimaryButton';
import TextInput from '../TextInput';

export default function RegisterForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    console.log({ errors });
    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };
    return (
        <>
            <form onSubmit={submit} className="flex w-full flex-col gap-5 py-6">
                <div className="flex flex-col">
                    <InputLabel htmlFor="name">Nombre</InputLabel>
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        type="text"
                        placeholder="Pedro Doe"
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="flex flex-col">
                    <InputLabel htmlFor="email">Username/Email</InputLabel>
                    <TextInput
                        id="email"
                        name="email"
                        value={data.email}
                        type="text"
                        placeholder="pedro@mail.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="flex flex-col">
                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                    <TextInput
                        id="password"
                        name="password"
                        value={data.password}
                        type="password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <InputLabel htmlFor="password">
                        Confirma contraseña
                    </InputLabel>
                    <TextInput
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        type="password"
                        autoComplete="new-password"
                        required
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />
                    <InputError message={errors.password} className="mt-2" />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <PrimaryButton disabled={processing}>Registrar</PrimaryButton>
            </form>
            <div className="text-sm text-plumpPurpleDark">
                ¿Ya tienes cuenta?{' '}
                <a href={route('login')} className="font-semibold">
                    Inicia sesión
                </a>
            </div>
        </>
    );
}
