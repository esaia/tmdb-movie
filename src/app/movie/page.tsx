'use client';

import { generateSlug } from '@/lib/helpers';
import { getAllMovies } from '@/lib/requests';
import Loading from '@/src/components/UiComponents/Loading';
import MovieCard from '@/src/components/UiComponents/MovieCard';
import Pagination from '@/src/components/UiComponents/Pagination';
import { paginationMovie } from '@/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useMemo, useState } from 'react';

const Page = () => {
  return (
    <Suspense>
      <MoviesList />
    </Suspense>
  );
};

export default Page;

const MoviesList = () => {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<paginationMovie>();
  // movies?.data.filter((movie) => movie.taxonomy.some(taxonomy => taxonomy.slug === "coming_soon") )
  const [loading, setLoading] = useState(true);

  const generatePerPage = () => {
    if (window.innerWidth < 768) {
      return 14;
    } else {
      return 15;
    }
  };

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const movies = await getAllMovies({ page: searchParams.get('page')?.toString(), perpage: generatePerPage() });
      setMovies(movies);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [searchParams.get('page')]);

  return (
    <div className="mainContainer relative m-auto min-h-svh max-w-max_width pt-24 lg:pt-40">
      {loading ? (
        <div className="flex h-fit items-start justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
            {movies?.data?.map((movie, i) => {
              return (
                <div key={movie.id} className="fadeIn scale-0" style={{ animationDelay: `${i * 0.04}s` }}>
                  <Link href={`/movie/${generateSlug(movie)}`}>
                    <MovieCard movie={movie} />
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center py-10">
            {movies?.data.length !== 0 && movies?.total && movies?.total > movies?.per_page && (
              <Pagination total={movies?.last_page} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
