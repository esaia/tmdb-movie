import { getGenres, getMovies } from '@/lib/requests';
// COMPONENTS
import MainSlider from '@/src/components/MainSlider';
import CategorySlider from '@/src/components/CategorySlider';
import ComingSoon from '@/src/components/ComingSoon';
import ContinueWatching from '@/src/components/ContinueWatching';

// ICONS
import { BiCameraMovie } from 'react-icons/bi';
import MobMainSlider from '@/src/components/MobMainSlider';

const fetchData = async () => {
  const popularMovies = await getMovies('/movie/popular');
  const popularMoviesPageTwo = await getMovies('/movie/popular', { params: { page: 2 } });
  const topRatedMovies = await getMovies('/movie/top_rated');
  const genres = await getGenres();

  return { popularMovies, popularMoviesPageTwo, topRatedMovies, genres };
};

const Home = async () => {
  const { popularMovies, popularMoviesPageTwo, topRatedMovies, genres } = await fetchData();
  return (
    <div>
      <div>
        <div className="hidden lg:flex">
          <MainSlider movies={popularMovies} genres={genres} />
        </div>

        <div className="lg:hidden">
          <MobMainSlider movies={popularMovies.slice(0, 8)} />
        </div>
      </div>

      {/* <ContinueWatching /> */}

      <CategorySlider movies={popularMovies} categoryTitle={'Popular'} icon={<BiCameraMovie />} />
      <CategorySlider movies={popularMoviesPageTwo} categoryTitle={'Trending Movies'} icon={<BiCameraMovie />} />
      <CategorySlider movies={topRatedMovies} categoryTitle={'Top Rated'} icon={<BiCameraMovie />} />

      <ComingSoon movies={popularMovies} />
    </div>
  );
};

export default Home;
