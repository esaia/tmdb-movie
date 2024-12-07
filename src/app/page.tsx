export const revalidate = 1;

import { getAllMovies, getTaxonomies } from '@/lib/requests';
// COMPONENTS
import MainSlider from '@/src/components/MainSlider';
import CategorySlider from '@/src/components/CategorySlider';
import ComingSoon from '@/src/components/ComingSoon';
import ContinueWatching from '@/src/components/ContinueWatching';

// ICONS
import { BiCameraMovie } from 'react-icons/bi';
import { MovieType, Taxonomy } from '@/types';
import MobMainSlider from '@/src/components/MobMainSlider';

const fetchData = async () => {
  const taxonomies: Taxonomy[] = await getTaxonomies();
  const taxonomyMoviesArray: { data: MovieType[]; taxonomy: string }[] = await getAllMovies({ isGrouped: true });

  return { taxonomies, taxonomyMoviesArray };
};

const Home = async () => {
  const { taxonomies, taxonomyMoviesArray } = await fetchData();

  return (
    <div>
      <>
        <div>
          <div className="hidden lg:flex">
            {taxonomyMoviesArray.find(taxonomyMovie => taxonomyMovie.taxonomy === 'trending') && (
              <MainSlider
                movies={
                  taxonomyMoviesArray.find(taxonomyMovie => taxonomyMovie.taxonomy === 'trending')?.data as MovieType[]
                }
              />
            )}
          </div>

          <div className="lg:hidden">
            {taxonomyMoviesArray.find(taxonomyMovie => taxonomyMovie.taxonomy === 'trending') && (
              <MobMainSlider
                movies={
                  taxonomyMoviesArray.find(taxonomyMovie => taxonomyMovie.taxonomy === 'trending')?.data as MovieType[]
                }
              />
            )}
          </div>
        </div>

        <ContinueWatching />

        {taxonomies
          .filter(taxonomy => !['trending', 'coming_soon'].includes(taxonomy?.slug))
          .sort((a, b) => {
            return -1;
          })
          .map(taxonomy => {
            return (
              taxonomyMoviesArray.find(taxonomyMovie => taxonomyMovie.taxonomy === taxonomy?.slug)?.data && (
                <CategorySlider
                  movies={
                    taxonomyMoviesArray.find(taxonomyMovie => taxonomyMovie.taxonomy === taxonomy?.slug)
                      ?.data as MovieType[]
                  }
                  categoryTitle={taxonomy.name}
                  icon={<BiCameraMovie />}
                />
              )
            );
          })}

        {taxonomyMoviesArray.find(taxonomyMovie => taxonomyMovie.taxonomy === 'coming_soon')?.data?.length ? (
          <ComingSoon
            movies={
              taxonomyMoviesArray.find(taxonomyMovie => taxonomyMovie.taxonomy === 'coming_soon')?.data as MovieType[]
            }
          />
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default Home;
