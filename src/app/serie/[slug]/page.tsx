import { getIdFromSlug } from '@/lib/helpers';
import { getAllGenres, getAllSeries, getSingleSerie } from '@/lib/requests';
import CategorySlider from '@/src/components/CategorySlider';
import Actors from '@/src/components/singleView/Actors';
import MovieDetail from '@/src/components/singleView/MovieDetail';
import VideoPlayer from '@/src/components/singleView/VideoPlayer';
import { MovieType, paginationMovie } from '@/types';
import { notFound } from 'next/navigation';
import { BiCameraMovie } from 'react-icons/bi';

const Page = async ({ params }: { params: { slug: string } }) => {
  const series: paginationMovie = await getAllSeries({ taxonomy: 'trending' });
  const serie: MovieType = (await getSingleSerie(getIdFromSlug(params.slug))) as MovieType;
  // const movieActors = await getMovieActors(serie.tmdb_id);
  const genres = await getAllGenres();

  if (!serie) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-5 pb-5 lg:gap-10 lg:pb-10">
      <VideoPlayer movie={serie} />
      <MovieDetail movie={serie} genres={genres} />
      {/* {movieActors?.cast && <Actors actors={movieActors?.cast} />} */}

      {serie?.tmdb_id && <Actors tmdbId={serie?.tmdb_id} />}

      {series.data.filter(serie => Number(serie.id) !== getIdFromSlug(params.slug)).length ? (
        <div className="[&_.wrapper]:py-0">
          <CategorySlider
            movies={series.data.filter(serie => Number(serie.id) !== getIdFromSlug(params.slug)).slice(0, 15)}
            categoryTitle="ნახეთ კიდევ"
            icon={<BiCameraMovie />}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
