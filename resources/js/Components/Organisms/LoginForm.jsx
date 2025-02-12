import { useForm } from '@inertiajs/react';
import Checkbox from '../Checkbox';
import InputError from '../InputError';
import InputLabel from '../InputLabel';
import PrimaryButton from '../PrimaryButton';
import TextInput from '../TextInput';

export default function LoginForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };
    return (
        <>
            <form onSubmit={submit} className="flex w-full flex-col gap-5 py-6">
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
                <div className="flex justify-between text-xs text-plumpPurpleDark">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <label htmlFor="remember" className="uppercase">
                            Recuérdame
                        </label>
                    </div>
                    <a
                        href={route('password.request')}
                        className="text-sm font-semibold"
                    >
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
                <PrimaryButton>Iniciar session</PrimaryButton>
            </form>
            <div className="text-sm text-plumpPurpleDark">
                ¿No tienes cuenta?{' '}
                <a href={route('register')} className="font-semibold">
                    Regístrate
                </a>
            </div>
        </>
    );
}
