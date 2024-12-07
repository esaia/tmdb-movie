import { getIdFromSlug } from '@/lib/helpers';
import { getAllGenres, getAllMovies, getSingleMovie } from '@/lib/requests';
import CategorySlider from '@/src/components/CategorySlider';
import Actors from '@/src/components/singleView/Actors';
import MovieDetail from '@/src/components/singleView/MovieDetail';
import VideoPlayer from '@/src/components/singleView/VideoPlayer';
import { MovieType, genreType, paginationMovie } from '@/types';
import { cache } from 'react';
import { BiCameraMovie } from 'react-icons/bi';

const getItem = cache(async (id: number) => {
  const movie: MovieType = (await getSingleMovie(+id)) as MovieType;
  return movie;
});

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const movieId = getIdFromSlug(params.slug);
  const movie: MovieType = await getItem(movieId);
  return {
    title: movie.title_ka,
    description: movie.description,
    alternates: { canonical: `http://qmovies.net/movie/${movieId}` },
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const [movies, movie, genres]: [movies: paginationMovie, movie: MovieType, genres: genreType[]] = await Promise.all([
    getAllMovies({ taxonomy: 'trending' }),
    (await getItem(getIdFromSlug(params.slug))) as MovieType,
    getAllGenres(),
  ]);

  return (
    <div className="flex flex-col gap-5 pb-5 lg:gap-10 lg:pb-10">
      <VideoPlayer movie={movie} />
      <MovieDetail movie={movie} genres={genres} />

      {movie?.tmdb_id && <Actors tmdbId={movie?.tmdb_id} />}

      {movies.data.length && (
        <div className="[&_.wrapper]:py-0">
          <CategorySlider
            movies={movies.data.filter(movie => Number(movie.id) !== Number(getIdFromSlug(params.slug)))}
            categoryTitle="ნახეთ კიდევ"
            icon={<BiCameraMovie />}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
