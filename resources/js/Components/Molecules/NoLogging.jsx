import SadFace from '../Atoms/SvgIcons/SadFace';

export default function NoLogging({ children }) {
    return (
        <div className="rounded-md border border-dashed border-plumpPurpleDark p-5 font-poppins">
            <div className="mb-4 flex flex-col items-center justify-center gap-4 md:flex-row">
                <SadFace className="w-8 animate-spin stroke-plumpPurpleDark" />
                <p className="text-md text-center text-plumpPurpleDark">
                    {children || 'Debes iniciar sesión'}
                </p>
            </div>
            <div className="flex items-center justify-center divide-x divide-plumpPurpleDark text-base text-plumpPurpleDark">
                <a
                    className="px-4 transition-all duration-200 hover:underline"
                    href={route('login')}
                >
                    Iniciar sesión
                </a>

                <a
                    className="px-4 transition-all duration-200 hover:underline"
                    href={route('register')}
                >
                    Registrarse
                </a>
            </div>
        </div>
    );
}
