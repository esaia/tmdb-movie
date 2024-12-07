interface Genre {
  id: number;
  genre: string;
  created_at: string;
  updated_at: string;
  pivot: {
    movie_id: number;
    genre_id: number;
  };
}

interface paginationMovie {
  current_page: number;
  data: MovieType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLinks[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
interface paginationSerie {
  current_page: number;
  data: SeriesType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLinks[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface MovieType {
  id: number;
  title_ka: string;
  title_en: string;
  year: number;
  director: string;
  description: string;
  imdb: string;
  poster_image: string;
  cover_image: string;
  country: string;
  minutes: string;
  tmdb_id: number;
  movie_url: string;
  serie_urls?: serieUrl[];

  status: boolean;
  genres: Genre[];
  taxonomy: Taxonomy[];
  created_at: string;
  updated_at: string;
}

interface MovieInput {
  title_ka: string;
  title_en: string;
  year: number;
  description: string;
  director: string;
  imdb: string;
  poster_image: string;
  cover_image: string;
  country: string;
  minutes: string;
  tmdb_id: number;
  movie_url: string;
  status: boolean;
  genre_ids: number[];
  taxonomy_ids: number[];
}

interface TmdbType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
  poster_path: string;
  title: string;
}

interface SeriesType {
  id: number;
  title_ka: string;
  title_en: string;
  year: number;
  director: string;
  description: string;
  imdb: string;
  poster_image: string;
  cover_image: string;
  country: string;
  minutes: string;
  tmdb_id: number;
  status: boolean;
  genres: Genre[];
  taxonomy: Taxonomy[];
  serie_urls: serieUrl[];
  created_at: string;
  updated_at: string;
}

interface SeriesInput {
  title_ka: string;
  title_en: string;
  year: number;
  description: string;
  director: string;
  imdb: string;
  poster_image: string;
  cover_image: string;
  country: string;
  minutes: string;
  tmdb_id: number;
  status: boolean;
  genre_ids: number[];
  taxonomy_ids: number[];
  serie_urls: serieUrl[];
}

export interface serieUrl {
  serie: number;
  season: number;
  url: string;
}

interface genreType {
  id: number;
  genre: string;
}

interface userInputes {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  repeatPassowrd: string;
  remember?: boolean;
}

export interface Taxonomy {
  name: string;
  slug: string;
  id: number;
}

export interface continueWatchingType {
  id: number;
  title_ka: string;
  title_en: string;
  time: number;
  cover_image: string;
  duration: number;
  date: Date;
  season?: number;
  serie?: number;
}

enum VideoType {
  Movie = 'movie',
  Series = 'serie',
}
