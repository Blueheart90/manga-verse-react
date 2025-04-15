import { cn } from '@/lib/utils';
import { Field, Radio, RadioGroup } from '@headlessui/react';
import { useField } from 'formik';

const MyRadioGroup = ({
    radioOptions,
    label,
    className = '',
    disabled = false,
    ...props
}) => {
    const [field, meta, helpers] = useField(props.name);

    return (
        <RadioGroup
            value={meta.value}
            onChange={(value) => {
                helpers.setValue(value);
            }}
            className={cn('flex items-center gap-4', className)}
        >
            <p className="text-base text-plumpPurpleDark">{label}</p>
            <div className="inline-flex overflow-hidden rounded-md border border-plumpPurple">
                {radioOptions.map((option, index) => (
                    <Field key={option.name + index} disabled={disabled}>
                        <Radio
                            value={option.value}
                            className={cn(
                                `flex cursor-pointer gap-2 px-3 py-1 text-base text-plumpPurpleDark outline-none data-[checked]:bg-plumpPurpleDark data-[checked]:text-white`,
                            )}
                        >
                            {option.icon ? option.icon : null}
                            {option.name}
                        </Radio>
                    </Field>
                ))}
            </div>
        </RadioGroup>
    );
};

export default MyRadioGroup;
