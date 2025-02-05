import { useEffect } from 'react';
import Arrow from '../Atoms/SvgIcons/Arrow';

export default function SideMenu({ open, setOpen, children }) {
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
            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-60 ${
                    open ? 'visible opacity-100' : 'invisible opacity-0'
                } transition-opacity duration-300 ease-out`}
                onClick={closeSidebar}
            ></div>

            <div
                className={`fixed inset-y-0 left-0 w-64 bg-white ${
                    open ? 'translate-x-0' : '-translate-x-full'
                } transform transition duration-300 ease-in-out`}
            >
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

                {children}
            </div>
        </>
    );
}
