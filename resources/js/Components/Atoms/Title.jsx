import { twMerge } from 'tailwind-merge';

export default function Title({ level, children, className, ...props }) {
    const Tag = `h${level}`;
    return (
        <Tag
            className={twMerge(
                'mb-4 font-sintony text-3xl font-bold capitalize text-white',
                className,
            )}
            {...props}
        >
            {children}
        </Tag>
    );
}
