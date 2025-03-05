import { cn } from '@/lib/utils';
import CharacterCard from './CharacterCard';

export default function CharactersManga({ characters, className }) {
    return (
        <div className={cn('space-y-2', className)}>
            {characters.map((character) => (
                <CharacterCard key={character.mal_id} character={character} />
            ))}
        </div>
    );
}
