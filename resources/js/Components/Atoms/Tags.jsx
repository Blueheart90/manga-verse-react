export default function Tags({ tags, className = '' }) {
    return (
        <div className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
            {tags.map((tag) => (
                <span className="rounded border border-white px-2 py-1 text-xs text-white">
                    {tag}
                </span>
            ))}
        </div>
    );
}
