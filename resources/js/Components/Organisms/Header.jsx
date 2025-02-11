import { useState } from 'react';
import Bars from '../Atoms/SvgIcons/Bars';
import MagnifyingGlass from '../Atoms/SvgIcons/MagnifyingGlass';
import UserCircle from '../Atoms/SvgIcons/UserCircle';
import XMark from '../Atoms/SvgIcons/XMark';
import InputLabel from '../InputLabel';
import Modal from '../Modal';
import NavLink from '../NavLink';
import PrimaryButton from '../PrimaryButton';
import TextInput from '../TextInput';
import SideMenu from './SideMenu';

const navLinks = [
    { href: 'popular', name: 'popular', text: 'Populares' },
    { href: 'trending', name: 'trending', text: 'Tendencias' },
    { href: 'new', name: 'new', text: 'Nuevos' },
    { href: 'categories', name: 'categories', text: 'Categorías' },
];
export default function Header({ user }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(false);
    const [modal, setModal] = useState(true);
    // console.log(user);

    return (
        <header className="bg-plumpPurple">
            <nav className="container mx-auto sm:px-5">
                <div className="flex h-[70px] justify-between px-2">
                    <div className="flex">
                        {/* Hamburger */}
                        <div className="mr-4 flex items-center 2xl:hidden">
                            <button
                                onClick={() => setOpen(!open)}
                                className="inline-flex items-center justify-center"
                            >
                                <Bars className="size-8 stroke-turquoise" />
                            </button>
                        </div>
                        {/* logo */}
                        <div className="flex flex-col items-center justify-center">
                            <p className="font-bubblegum text-3xl font-semibold text-white">
                                Manga
                                <span className="text-turquoise">verse</span>
                            </p>
                            <span className="text-sm font-semibold text-turquoise">
                                マンガバース
                            </span>
                        </div>

                        <div className="hidden items-center space-x-8 sm:-my-px sm:ml-10 lg:flex">
                            {navLinks.map((link, index) => (
                                <NavLink
                                    key={index}
                                    // href={route(link.href)}
                                    active={route().current(link.name)}
                                >
                                    {link.text}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Search bar */}
                        <div
                            className={`${search ? 'block' : 'hidden'} fixed inset-x-0 top-[70px] bg-plumpPurple px-4 pb-2 2xl:static 2xl:block 2xl:p-0`}
                        >
                            <div className="relative">
                                <a
                                    href=""
                                    className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-[5px] bg-purple-200 px-2 py-1 text-xs uppercase text-plumpPurpleDark"
                                >
                                    Filter
                                </a>
                                <input
                                    type="text"
                                    name="keyword"
                                    className="h-10 w-full rounded-[5px] py-[6px] pl-16 pr-10 text-sm"
                                    placeholder="Search manga..."
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 transform">
                                    <MagnifyingGlass className="size-6 fill-plumpPurpleDark stroke-plumpPurpleDark" />
                                </button>
                            </div>
                        </div>
                        <div className="inline-flex gap-2">
                            <button
                                onClick={() => setSearch(!search)}
                                className="flex rounded-full border-2 border-transparent text-sm transition focus:outline-none 2xl:hidden"
                            >
                                <MagnifyingGlass className="size-8 fill-white stroke-white" />
                            </button>
                            <button
                                onClick={() => setModal(true)}
                                className="flex items-center gap-1 rounded-full border-2 border-transparent text-sm transition focus:outline-none"
                            >
                                <UserCircle className="size-8 fill-white" />
                                <span className="hidden text-white 2xl:inline">
                                    Usuario
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <SideMenu open={open} setOpen={setOpen}></SideMenu>
            <Modal show={modal} onClose={() => setModal(false)} maxWidth="lg">
                <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-[20px] bg-white px-14 py-8">
                    <button
                        onClick={() => {
                            setModal(false);
                        }}
                        className="absolute right-0 top-0 p-2"
                    >
                        <XMark className="size-6 fill-plumpPurpleDark" />
                    </button>
                    <h5 className="text-xl font-semibold text-plumpPurpleDark">
                        ¡Bienvenido de nuevo!
                    </h5>
                    <form
                        action=""
                        method="post"
                        className="flex w-full flex-col gap-5 py-6"
                    >
                        <div className="flex flex-col">
                            <InputLabel for="email">Username/Email</InputLabel>
                            <TextInput
                                type="text"
                                id="email"
                                name="email"
                                placeholder="pedro@mail.com"
                            />
                        </div>
                        <div className="flex flex-col">
                            <InputLabel for="password">Contraseña</InputLabel>
                            <TextInput
                                type="password"
                                id="password"
                                name="password"
                            />
                        </div>
                        <div className="flex justify-between text-xs text-plumpPurpleDark">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="rounded border-plumpPurple text-plumpPurpleDark focus:ring-0"
                                    name="remember"
                                    id="remember"
                                />
                                <label htmlFor="" className="uppercase">
                                    Recuerdame
                                </label>
                            </div>
                            <a href="" className="text-sm font-semibold">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                        <PrimaryButton>Iniciar session</PrimaryButton>
                    </form>
                    <div className="text-sm text-plumpPurpleDark">
                        ¿No tienes cuenta?{' '}
                        <a href="" className="font-semibold">
                            Registrate
                        </a>
                    </div>
                </div>
            </Modal>
        </header>
    );
}
