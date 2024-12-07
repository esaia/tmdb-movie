'use client';

import React, { useEffect, useState } from 'react';
import { MovieType } from '@/types';
import { MediaPlayer, MediaProvider, PlayButton, Poster } from '@vidstack/react';
import { DefaultAudioLayout, defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { PauseIcon, PlayIcon } from '@vidstack/react/icons';
import Image from 'next/image';
import { getMovieVideos } from '@/lib/requests';

const VideoPlayer = ({ movie }: { movie: MovieType }) => {
  const [videoId, setVideoId] = useState();

  useEffect(() => {
    const fetchMovieVideos = async () => {
      const movieVideos = await getMovieVideos(movie.id);
      setVideoId(movieVideos?.[0]?.key);
    };
    fetchMovieVideos();
  }, []);
  return (
    <div className="mainContainer m-auto mt-[80px] w-full max-w-max_width lg:mt-[130px]">
      <div className="relative w-full pt-[55%] md:pt-[50%] lg:pt-[40%]">
        {/* <div className="absolute left-0 top-0 h-full w-full scale-y-[1.04] bg-gradient-to-b from-black/70 via-gray-900/90 to-black" /> */}
        <div className="bg-red-30 absolute left-1/2 top-0 flex h-full w-full -translate-x-1/2 items-center gap-5">
          <Image
            src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : '/images/poster.jpg'}
            width={300}
            height={450}
            alt={movie.title}
            className="hidden aspect-2/3 h-full w-fit cursor-pointer rounded-lg object-cover lg:block"
          />

          <MediaPlayer
            title={movie.title}
            className="group !h-full cursor-pointer !rounded-lg"
            src={`https://www.youtube.com/watch?v=${videoId}`}>
            <>
              <MediaProvider>
                {movie.backdrop_path && (
                  <Poster
                    className="absolute inset-0 block h-full w-full rounded-lg bg-black object-cover opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                )}
              </MediaProvider>
              <PlayButton className="group absolute left-[50%] inline-flex h-10 w-10 translate-x-[-50%] scale-100 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 transition-all duration-300 hover:bg-white/20 data-[pressed]:scale-0 data-[focus]:ring-4">
                <PlayIcon className="h-1w-14 hidden w-14 group-data-[paused]:block" />
                <PauseIcon className="h-1w-14 w-14 group-data-[paused]:hidden" />
              </PlayButton>
            </>

            <DefaultAudioLayout icons={defaultLayoutIcons} />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
