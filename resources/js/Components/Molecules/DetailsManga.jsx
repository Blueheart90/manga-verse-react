import Star from '../Atoms/SvgIcons/Star';

export default function DetailsManga({ data }) {
    return (
        <ul>
            {Object.entries(data).map(([key, value]) => {
                // Omitir claves con valores vacíos si es necesario
                if (value === '') return null;

                return (
                    <li className="flex items-center" key={key}>
                        <span className="w-32 max-w-[45%] font-bold capitalize">
                            {key.replace(/_/g, ' ')}:{' '}
                        </span>
                        <span className="max-w-[55%] capitalize">{value}</span>
                        {key === 'rating' && <Star className="ml-1 size-4" />}
                    </li>
                );
            })}
        </ul>
    );
}
