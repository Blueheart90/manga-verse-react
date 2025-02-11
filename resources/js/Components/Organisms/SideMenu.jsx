import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Arrow from '../Atoms/SvgIcons/Arrow';
import Home from '../Atoms/SvgIcons/Home';
import Logout from '../Atoms/SvgIcons/Logout';
import UserCircle from '../Atoms/SvgIcons/UserCircle';
import ResponsiveNavLink from '../ResponsiveNavLink';

export default function SideMenu({ open, setOpen, children }) {
    const { auth } = usePage().props;
    console.log(auth);

    const closeSidebar = () => {
        setOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeSidebar();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            {/* Fondo oscuro que cubre el contenido principal */}
            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-60 ${
                    open ? 'visible opacity-100' : 'invisible opacity-0'
                } transition-opacity duration-300 ease-out`}
                onClick={closeSidebar}
            ></div>

            {/* Menú Lateral */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white ${
                    open ? 'translate-x-0' : '-translate-x-full'
                } transform transition duration-300 ease-in-out`}
            >
                {/* Encabezado del Menú */}
                <div className="flex h-[70px] items-center px-4">
                    <button
                        onClick={closeSidebar}
                        className="rounded-full bg-purple-200 p-2 transition-colors hover:bg-purple-300"
                    >
                        <Arrow
                            className="size-6 stroke-plumpPurpleDark"
                            direction="left"
                        />
                    </button>
                </div>

                {/* Contenido del Menú */}
                <div className="flex h-[calc(100%-70px)] flex-col justify-between overflow-y-auto p-4">
                    {/* Contenido Principal del Menú */}
                    <div className="flex flex-col space-y-2">
                        <ResponsiveNavLink
                            href={route('home')}
                            active={route().current('home')}
                        >
                            <Home />
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('home')}
                            // active={route().current('home')}
                        >
                            <UserCircle />
                            Perfil
                        </ResponsiveNavLink>
                        {children}
                    </div>

                    {/* Enlace de Cerrar Sesión (al final del menú) */}
                    <div className="border-t pt-4">
                        {auth?.user ? (
                            <ResponsiveNavLink
                                href={route('logout')}
                                method="post"
                                as="button"
                            >
                                <Logout />
                                Cerrar sesión
                            </ResponsiveNavLink>
                        ) : (
                            <div className="space-y-2">
                                <ResponsiveNavLink
                                    className="justify-center bg-plumpPurpleDark text-white"
                                    href={route('login')}
                                >
                                    Iniciar sesión
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    className="justify-center border border-transparent hover:border-plumpPurpleDark hover:bg-white hover:text-plumpPurpleDark"
                                    href={route('register')}
                                >
                                    Registro
                                </ResponsiveNavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
