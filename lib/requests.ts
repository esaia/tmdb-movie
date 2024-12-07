import axios from 'axios';
import { qtvBack, tmdbAxios } from './axios';
import { Taxonomy, userInputes } from '@/types';
import { notFound } from 'next/navigation';

interface MovieSearchParams {
  searchQuery?: string;
  page?: string;
  perpage?: number;
  taxonomy?: string;
  isGrouped?: boolean;
}

export const searchData = async (
  params: MovieSearchParams = {
    searchQuery: '',
    page: '1',
    perpage: 8,
  },
) => {
  const { data } = await qtvBack.get(`${process.env.NEXT_PUBLIC_URL_API}/movies-series`, {
    params,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET  ',
    },
  });

  return data;
};

export const getAllMovies = async (
  params: MovieSearchParams = {
    searchQuery: '',
    page: '1',
    perpage: 8,
    taxonomy: '',
    isGrouped: false,
  },
) => {
  const { data } = await qtvBack.get(`${process.env.NEXT_PUBLIC_URL_API}/movies`, {
    params,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET  ',
    },
  });

  return data;
};

export const getAllSeries = async (
  params: MovieSearchParams = {
    searchQuery: '',
    page: '1',
    perpage: 8,
    taxonomy: '',
  },
) => {
  const { data } = await qtvBack.get(`${process.env.NEXT_PUBLIC_URL_API}/series`, {
    params,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET  ',
    },
  });

  return data;
};

export const getSingleSerie = async (id: number) => {
  try {
    const { data } = await qtvBack.get(`${process.env.NEXT_PUBLIC_URL_API}/series/${id}`);
    return data;
  } catch (error) {
    return notFound();
  }
};

export const getSingleMovie = async (id: number) => {
  try {
    const { data } = await qtvBack.get(`${process.env.NEXT_PUBLIC_URL_API}/movies/${id}`);

    return data;
  } catch (error) {
    return notFound();
  }
};

export const getAllGenres = async () => {
  const { data } = await qtvBack.get(`${process.env.NEXT_PUBLIC_URL_API}/genres`);

  return data;
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

// AUTHENTICATION

export const login = async (user: userInputes) => {
  await axios.get(`${process.env.NEXT_PUBLIC_URL}/sanctum/csrf-cookie`, { withCredentials: true, withXSRFToken: true });

  const { data } = await qtvBack.post('/login', user, { withCredentials: true });
  // const { data } = await qtvBack.post(`${process.env.NEXT_PUBLIC_URL_API}/login`, user);

  // const data = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/login`, { credentials: 'include', body: user });

  return data;
};

export const logout = async () => {
  const { data } = await qtvBack.post(`${process.env.NEXT_PUBLIC_URL_API}/logout`);
  return data;
};

export const getUser = async () => {
  const { data } = await qtvBack.get('/user', { withCredentials: true });
  return data;
};

export const getMovies = async (searchQuery?: string, page: string = '1', sort?: string, dir?: string) => {
  const { data } = await qtvBack.get('/allMovies', {
    params: { searchQuery, sort, dir, page },
    headers: {
      'content-type': 'application/json',
    },
  });

  return data;
};

export const getSeries = async (searchQuery?: string, page: string = '1', sort?: string, dir?: string) => {
  const { data } = await qtvBack.get('/allSeries', {
    params: { searchQuery, sort, dir, page },
    headers: {
      'content-type': 'application/json',
    },
  });

  return data;
};

export const getArchivedMovies = async (searchQuery?: string, page: string = '1', sort?: string, dir?: string) => {
  const { data } = await qtvBack.get('/archived', {
    params: { searchQuery, sort, dir, page },
    headers: {
      'content-type': 'application/json',
    },
  });

  return data;
};

export const storeMovie = async (movie: FormData) => {
  const { data } = await qtvBack.post('/movies', movie, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

  return data;
};

export const storeSerie = async (serie: FormData) => {
  const { data } = await qtvBack.post('/series', serie, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

  return data;
};

export const editSerie = async (movie: FormData, id: number) => {
  const { data } = await qtvBack.post(`/series/${id}`, movie, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

  return data;
};

export const editSeriesStatus = async (status: boolean = false, id: number) => {
  const { data } = await qtvBack.post(`/series/status/${id}`, { status });

  return data;
};

export const deleteSerie = async (id: number) => {
  const { data } = await qtvBack.delete(`/series/${id}`);

  return data;
};

export const editMovie = async (movie: FormData, id: number) => {
  const { data } = await qtvBack.post(`/movies/${id}`, movie, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

  return data;
};

export const editMovieStatus = async (status: boolean = false, id: number) => {
  const { data } = await qtvBack.post(`/movies/status/${id}`, { status });

  return data;
};

export const deleteMovie = async (id: number) => {
  const { data } = await qtvBack.delete(`/movies/${id}`);

  return data;
};

export const restoreMovie = async (id: number) => {
  const { data } = await qtvBack.post(`/movies/restore/${id}`);

  return data;
};

export const deleteMovieForever = async (id: number) => {
  const { data } = await qtvBack.delete(`/movies/delete/${id}`);

  return data;
};

export const getTaxonomies = async () => {
  const { data } = await qtvBack.get('/taxonomy');

  return data;
};

export const storeTaxonomy = async (taxonomy: Taxonomy) => {
  const { data } = await qtvBack.post('/taxonomy', taxonomy);

  return data;
};

export const editTaxonomy = async (taxonomy: Taxonomy, id: number) => {
  const { data } = await qtvBack.post(`/taxonomy/${id}`, taxonomy);

  return data;
};

export const deleteTaxonomy = async (id: number) => {
  const { data } = await qtvBack.delete(`/taxonomy/${id}`);

  return data;
};

export const getCurrentDate = async () => {
  const { data } = await qtvBack.get('/current-date');

  return data;
};
