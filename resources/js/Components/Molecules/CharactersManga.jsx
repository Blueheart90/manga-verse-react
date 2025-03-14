import { cn } from '@/lib/utils';
import CharacterCard from './CharacterCard';

export default function CharactersManga({ characters, className }) {
    return (
        <div className={cn('space-y-2', className)}>
            {characters.map((character, index) => (
                <CharacterCard key={index} character={character} />
            ))}
        </div>
    );
}
