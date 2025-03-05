export default function CharacterCard({ character }) {
    const {
        character: { images, name },
        role,
    } = character;
    return (
        <div className="flex items-center gap-2">
            <img
                className="size-16 rounded-full object-cover object-center"
                src={images.webp.image_url}
                alt={`Imagen de ${name}}`}
            />
            <div>
                <p className="text-sm">{name}</p>
                <p className="text-xs font-bold">{role}</p>
            </div>
        </div>
    );
}
