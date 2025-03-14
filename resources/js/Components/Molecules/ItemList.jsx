import Arrow from '../Atoms/SvgIcons/Arrow';
import Document from '../Atoms/SvgIcons/Document';

export default function ItemList() {
    return (
        <div className="flex items-center justify-between border-l-4 border-transparent p-2 text-plumpPurpleDark transition-all duration-200 hover:border-plumpPurple hover:bg-plumpPurpleLight">
            <div className="flex gap-2">
                <Document className="size-6" />
                <p className="text-base">
                    Chapter 139: Heading to the Tree On Top of The hill
                </p>
            </div>
            <button>
                <Arrow direction="down" />
            </button>
        </div>
    );
}
