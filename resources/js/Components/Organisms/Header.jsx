import { useState } from 'react';
import Bars from '../Atoms/SvgIcons/Bars';
import MagnifyingGlass from '../Atoms/SvgIcons/MagnifyingGlass';
import UserCircle from '../Atoms/SvgIcons/UserCircle';
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
    const [modal, setModal] = useState(false);
    console.log(user);

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

                        <div className="hidden items-center space-x-8 text-white sm:-my-px sm:ml-10 lg:flex">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    name={link.name}
                                >
                                    {link.text}
                                </a>
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
                                onClick={() => setSearch(true)}
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
            <SideMenu open={open} setOpen={setOpen}>
                hola
            </SideMenu>
        </header>
    );
}
