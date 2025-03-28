import { Switch } from '@headlessui/react';
import Arrow from '../Atoms/SvgIcons/Arrow';

export default function OrderInput({ order = 'asc', onChange }) {
    const handleChange = () => {
        const newOrder = order === 'asc' ? 'desc' : 'asc';
        onChange?.(newOrder, 1); // Resetear a la primera página
    };

    return (
        <Switch
            checked={order === 'desc'}
            onChange={handleChange}
            className="group inline-flex h-8 w-[72px] items-center overflow-hidden rounded-md bg-plumpPurpleDark transition data-[checked]:bg-plumpPurpleDark"
            aria-label={`Ordenar capítulos en orden ${order === 'asc' ? 'ascendente' : 'descendente'}`}
        >
            <span className="sr-only">
                Cambiar orden de{' '}
                {order === 'asc'
                    ? 'ascendente a descendente'
                    : 'descendente a ascendente'}
            </span>
            <div className="flex translate-x-2 items-center gap-1 text-white transition group-data-[checked]:-translate-x-9">
                <span className="w-9 text-right text-sm">Asc</span>
                <Arrow
                    direction={order === 'desc' ? 'down' : 'up'}
                    className="size-5 transition-all duration-300"
                />
                <span className="w-9 text-sm">Desc</span>
            </div>
        </Switch>
    );
}
