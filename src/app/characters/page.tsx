import { Card } from '@/components/UIComponents/Card';
import { Filter } from '../../components/UIComponents/Filter';
import { Paginator } from '@/components/UIComponents/Paginator';
import { getAllCharacters } from '@/api/services/characters/getAllCharacters';
import { NextPageParams } from '@/types/next-page-params';

import styles from './CharactersPage.module.scss';

const CharactersPage = async ({ searchParams }: NextPageParams) => {
  const characters = await getAllCharacters({
    page: Number(searchParams?.page),
    gender: searchParams?.gender,
    name: searchParams?.name,
    status: searchParams?.status,
  });

  const handleCharactersDisplay = () => {
    if (!characters.results) {
      return <div className={styles.characters__notFound}>No characters found. Please change your filter settings</div>;
    }
  };

  return (
    <div className={styles.characters}>
      <div className={styles.characters__filterWrapper}>
        <Filter />
      </div>

      {!characters?.results ? (
        handleCharactersDisplay()
      ) : (
        <>
          <div className={styles.characters__content}>
            {characters.results.map((char) => (
              <Card key={char.id} id={char.id} img={char.image} name={char.name} />
            ))}
          </div>

          <Paginator
            sourceUrl={'/characters'}
            activePage={searchParams?.page}
            pagesCount={characters.info.pages}
            additionalQueries={{ name: searchParams?.name, status: searchParams?.status, gender: searchParams?.gender }}
          />
        </>
      )}
    </div>
  );
};
export default CharactersPage;
