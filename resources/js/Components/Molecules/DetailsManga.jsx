export default function DetailsManga({ data }) {
    return (
        <div>
            {Object.entries(data).map(([key, value]) => {
                // Omitir claves con valores vacíos si es necesario
                if (value === '') return null;

                return (
                    <div key={key}>
                        <span className="font-bold capitalize">
                            {key.replace(/_/g, ' ')}:{' '}
                        </span>
                        <span className="capitalize">
                            {typeof value === 'string' ? value : value}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
