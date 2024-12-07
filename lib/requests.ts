import { tmdbAxios } from './axios';
import { notFound } from 'next/navigation';

interface MovieSearchParams {
  query?: string;
  page?: string;
  perpage?: number;
  taxonomy?: string;
  isGrouped?: boolean;
}

export const searchData = async (
  params: MovieSearchParams = {
    query: '',
  },
) => {
  const { data } = await tmdbAxios.get('/search/movie', {
    params,
  });

  return data?.results;
};

export const getMovies = async (path: string, options?: any) => {
  const { data } = await tmdbAxios.get(path, options);

  return data?.results;
};

export const getGenres = async () => {
  const { data } = await tmdbAxios.get('genre/movie/list');

  return data?.genres;
};

export const getSingleMovie = async (id: number) => {
  try {
    const { data } = await tmdbAxios.get(`/movie/${id}`);

    return data;
  } catch (error) {
    return notFound();
  }
};

export const getMovieVideos = async (id: number) => {
  const { data } = await tmdbAxios.get(`movie/${id}/videos`);

  return data?.results;
};

export const getMovieActors = async (movieId: number) => {
  const { data } = await tmdbAxios.get(`/movie/${movieId}/credits?language=en-US`);

  return data;
};

export const getTmdbMovieId = async (movieTitle: string) => {
  const { data } = await tmdbAxios.get(`/search/movie?query=${movieTitle}&include_adult=false&language=en-US&page=1`);
  //
  // const data = fetch(
  //   `${process.env.NEXT_PUBLIC_TBDB}/search/movie?query=${movieTitle}&include_adult=false&language=en-US&page=1`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_TBDB_API}`,
  //       Accept: 'application/json',
  //     },
  //   },
  // );

  return data;
};
