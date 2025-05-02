import { cn } from '@/lib/utils';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import { useField } from 'formik';
import Arrow from '../Atoms/SvgIcons/Arrow';
import Check from '../Atoms/SvgIcons/Check';

export default function MyListBox({ name, options, className = '' }) {
    const [field, meta, helpers] = useField(name);
    console.log({ field, meta, helpers });
    return (
        <div className={cn('w-full', className)}>
            <Listbox
                value={meta.value}
                onChange={helpers.setValue}
                defaultValue={options[0].name}
            >
                <ListboxButton
                    className={cn(
                        'relative flex items-center gap-2 rounded-md bg-plumpPurple/5 px-3 py-1.5 text-left text-sm/6 text-plumpPurpleDark ring-1 ring-plumpPurple',
                        'focus:not-data-[focus]:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                    )}
                >
                    {options.find((option) => option.value === meta.value)
                        ?.name || options[0].name}
                    <Arrow
                        direction="down"
                        className="group size-4 text-plumpPurpleDark"
                    />
                </ListboxButton>
                <ListboxOptions
                    className={cn(
                        'rounded-xl border border-plumpPurple/5 bg-plumpPurpleLight p-1 text-plumpPurpleDark focus:outline-none',
                        'origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0',
                    )}
                    transition
                    anchor={{ to: 'bottom start', gap: '6px' }}
                >
                    {options.map((option) => (
                        <ListboxOption
                            key={option.id}
                            value={option.value}
                            className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-plumpPurple/25 data-[disabled]:opacity-50"
                            disabled={!option.available}
                        >
                            <Check className="invisible size-4 text-plumpPurpleDark group-data-[selected]:visible" />
                            {option.name}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    );
}
