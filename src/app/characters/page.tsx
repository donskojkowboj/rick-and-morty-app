import Link from 'next/link';

import { getAllCharacters } from '@/api/services/getAllCharacters';

import styles from './CharactersPage.module.scss';
import { Card } from '@/components/UIComponents/Card';

const CharactersPage = async () => {
  const characters = await getAllCharacters();

  return (
    <div className={styles.characters}>
      <Link className={styles.characters__link} href={`/characters/1,183`}>
        Filter characters
      </Link>
      <div className={styles.characters__content}>
        {characters.results.map((char) => (
          <Link href={`/character/${char.id}`} key={char.id}>
            <Card img={char.image} name={char.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default CharactersPage;
