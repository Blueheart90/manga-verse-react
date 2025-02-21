import { twMerge } from 'tailwind-merge';

export default function Title({ level, children, className, ...props }) {
    const Tag = `h${level}`;
    return (
        <Tag
            className={twMerge(
                'mb-4 font-sintony text-2xl font-bold capitalize text-white 2xl:text-3xl',
                className,
            )}
            {...props}
        >
            {children}
        </Tag>
    );
}
