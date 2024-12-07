import { getIdFromSlug } from '@/lib/helpers';
import { getMovies, getSingleMovie } from '@/lib/requests';
import CategorySlider from '@/src/components/CategorySlider';
import Actors from '@/src/components/singleView/Actors';
import MovieDetail from '@/src/components/singleView/MovieDetail';
import VideoPlayer from '@/src/components/singleView/VideoPlayer';
import { MovieType } from '@/types';
import { cache } from 'react';
import { BiCameraMovie } from 'react-icons/bi';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const movieId = getIdFromSlug(params.slug);
  const movie: MovieType = await getItem(movieId);
  return {
    title: movie?.title,
    description: movie?.overview,
  };
}

const getItem = cache(async (id: number) => {
  const movie: MovieType = (await getSingleMovie(+id)) as MovieType;
  return movie;
});

const fetchData = async () => {
  const popularMovies = await getMovies('/movie/popular');

  return popularMovies;
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const movieId = getIdFromSlug(params.slug);

  const movie = await getItem(movieId);
  const popularMovies = await fetchData();

  return (
    <div className="flex flex-col gap-5 pb-5 lg:gap-10 lg:pb-10">
      <VideoPlayer movie={movie} />
      <MovieDetail movie={movie} />

      <Actors tmdbId={movie?.id} />

      {popularMovies.length && (
        <div className="[&_.wrapper]:py-0">
          <CategorySlider movies={popularMovies} categoryTitle="See more" icon={<BiCameraMovie />} />
        </div>
      )}
    </div>
  );
};

export default Page;
