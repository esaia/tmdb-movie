import { continueWatchingType, MovieType } from '@/types';

export const generateSlug = (movie: MovieType) => {
  const titleSlug = movie?.title
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  return `${movie.id}-${titleSlug}`;
};

export const getIdFromSlug = (slug: string) => {
  return slug ? Number(slug?.trim()?.split('-')?.[0]) : -1;
};

export const formatDuration = (minutes: string) => {
  const hours = Math.floor(+minutes / 60);
  const remainingMinutes = +minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
  } else if (remainingMinutes === 0) {
    return `${hours} საათი`;
  } else {
    return `${hours} საათი და ${remainingMinutes} წუთი`;
  }
};
