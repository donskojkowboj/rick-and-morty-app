import Link from 'next/link';

import { getCharactersWithFilters } from '@/api/services/characters/getCharactersWithFilters';
import { CharacterFilters } from '@/types/models/character/character';
import { Card } from '@/components/UIComponents/Card';

import styles from '../CharactersPage.module.scss';
import { Paginator } from '@/components/UIComponents/Paginator';

interface CharactersPageProps {
  params: { slug: string };
  searchParams?: CharacterFilters;
}
const CharactersFiltered = async ({ params, searchParams }: CharactersPageProps) => {
  const characters = await getCharactersWithFilters(params.slug, searchParams);

  const charactersCount = characters.length;

  const displayPaginator = () => {
    if (charactersCount > 20) {
      return <Paginator pagesCount={charactersCount / 20} sourceUrl={'/characters'} />;
    }
  };

  return (
    <div className={styles.characters}>
      <Link className={styles.characters__link} href="/characters">
        Back to all characters
      </Link>
      <div className={styles.characters__content}>
        {characters.map((char) => (
          <Card id={char.id} name={char.name} img={char.image} key={char.id} />
        ))}
      </div>
      {displayPaginator()}
    </div>
  );
};

export default CharactersFiltered;
