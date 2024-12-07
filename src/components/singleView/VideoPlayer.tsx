'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MovieType, continueWatchingType } from '@/types';
import { MediaPauseEvent, MediaPlayer, MediaPlayerInstance, MediaProvider, PlayButton, Poster } from '@vidstack/react';
import { DefaultAudioLayout, defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { PauseIcon, PlayIcon } from '@vidstack/react/icons';
import Loading from '@/src/components/UiComponents/Loading';
import Image from 'next/image';

const VideoPlayer = ({ movie }: { movie: MovieType }) => {
  const isSerie = !!movie?.serie_urls;
  const storageKey = isSerie ? 'continue_watching_series' : 'continue_watching_movies';

  const player = useRef<MediaPlayerInstance>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [isRedy, setIsRedy] = useState(false);

  const [season, setSeason] = useState<number>(1);
  const [serie, setSerie] = useState<number>(1);
  const [movieSrc, setMovieSrc] = useState('');

  const [hasSelect, setHasSelect] = useState(true);

  const saveToLocalStorage = () => {
    let continueWatch: continueWatchingType[] = JSON.parse(localStorage.getItem(storageKey) || '[]');

    if (continueWatch) {
      const filteredStorage = continueWatch.filter((item: any) => item.id !== movie.id);
      continueWatch = filteredStorage;
    }

    const saveData: continueWatchingType = {
      id: movie.id,
      title_en: movie.title_en,
      title_ka: movie.title_ka,
      cover_image: movie.cover_image || '',
      duration: player.current?.duration || 1000,
      time: player.current?.currentTime || 0,
      date: new Date(),
    };

    if (isSerie) {
      saveData.season = season || 1;
      saveData.serie = serie || 1;
    }

    localStorage.setItem(storageKey, JSON.stringify([...continueWatch, saveData]));
  };
  const getUrlBySeasonAndSerie = (season: number, serie: number) => {
    if (!movie?.serie_urls) return;

    return movie?.serie_urls.find(item => item.season == season && item.serie == serie)?.url.trim();
  };

  const handleSeasoneChoose = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetValue = +e.target.value;
    setSeason(targetValue || 1);
    setSerie(1);

    setMovieSrc(getUrlBySeasonAndSerie(targetValue, 1) || '');
  };

  const handleSerieChoose = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetValue = +e.target.value;
    setSerie(targetValue || 1);

    setMovieSrc(getUrlBySeasonAndSerie(season, targetValue) || '');
  };

  const handlePause = (e: MediaPauseEvent) => {
    // saveToLocalStorage();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (player && !player.current?.paused) {
        saveToLocalStorage();
      }
    }, 500);

    if (isSerie && movie.serie_urls) {
      setMovieSrc(getUrlBySeasonAndSerie(season, serie) || '');
    } else {
      setMovieSrc(movie.movie_url);
    }

    return () => clearInterval(intervalId);
  }, [serie, season]);

  useEffect(() => {
    const checkAttribute = () => {
      if (player.current?.$el) {
        const hasAttribute = player.current.$el.hasAttribute('data-controls');
        setHasSelect(hasAttribute);
      }
    };

    // Initial check
    checkAttribute();

    // MutationObserver to detect attribute changes
    const observer = new MutationObserver(() => checkAttribute());

    if (player.current?.$el) {
      observer.observe(player.current.$el, { attributes: true });
    }

    // Clean up observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [player]);

  useEffect(() => {
    if (!movieSrc && isSerie) {
      setSerie(2);
      setSeason(1);
      setMovieSrc(getUrlBySeasonAndSerie(1, 1) || '');
    }
  }, [movieSrc]);

  useEffect(() => {
    const continueWatchStorage: continueWatchingType[] = JSON.parse(localStorage.getItem(storageKey) || '[]');

    const findContinueWatch = continueWatchStorage.find((item: any) => item.id === movie.id);

    if (findContinueWatch) {
      setCurrentTime(findContinueWatch?.time);
      setSeason(findContinueWatch?.season || 1);
      setSerie(findContinueWatch?.serie || 1);
    }
  }, []);

  return (
    <div className="mainContainer m-auto mt-[130px] w-full max-w-max_width">
      <div className="relative w-full pt-[55%] md:pt-[50%] lg:pt-[40%]">
        <div className="absolute left-0 top-0 h-full w-full scale-y-[1.04] bg-gradient-to-b from-black/70 via-gray-900/90 to-black" />
        <div className="gap- bg-red-30 absolute left-1/2 top-0 flex h-full max-h-max w-full -translate-x-1/2 items-center gap-5">
          <Image
            src={`${process.env.NEXT_PUBLIC_URL}/storage/${movie.poster_image}`}
            width={1080}
            height={1920}
            alt={movie.title_ka}
            className="hidden aspect-2/3 h-full w-fit cursor-pointer rounded-sm object-cover lg:block"
          />

          <MediaPlayer
            title={movie.title_ka}
            className="group h-full cursor-pointer !rounded-sm"
            ref={player}
            src={`https://pub-cbde4f25a3bc4e9dbf517a605b60617a.r2.dev/${movieSrc}`}
            currentTime={currentTime}
            onPause={e => handlePause(e)}
            onPlay={e => handlePause(e)}
            onCanLoad={e => setIsRedy(true)}>
            {isRedy ? (
              <>
                <MediaProvider>
                  <Poster
                    className="absolute inset-0 block h-full w-full rounded-sm bg-black object-cover opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                    src={`${process.env.NEXT_PUBLIC_URL}/storage/${movie.cover_image}`}
                    alt={movie.title_en}
                  />
                </MediaProvider>
                <PlayButton className="group absolute left-[50%] inline-flex h-10 w-10 translate-x-[-50%] scale-100 cursor-pointer items-center justify-center rounded-md outline-none ring-inset ring-sky-400 transition-all duration-300 hover:bg-white/20 data-[pressed]:scale-0 data-[focus]:ring-4">
                  <PlayIcon className="h-1w-14 hidden w-14 group-data-[paused]:block" />
                  <PauseIcon className="h-1w-14 w-14 group-data-[paused]:hidden" />
                </PlayButton>

                {isSerie && serie && season && (
                  <div className={`transition-all ${hasSelect ? 'opacity-100' : 'opacity-0'}`}>
                    {isSerie &&
                      movie?.serie_urls &&
                      movie.serie_urls.map((item, i) => (
                        <div key={i} className="absolute left-4 top-4 z-20 flex items-center gap-3">
                          <select
                            name="season"
                            value={season || 1}
                            className="rounded-md bg-primaryBlack px-4 py-2 outline-none md:min-w-44"
                            onChange={e => handleSeasoneChoose(e)}>
                            {[...new Set(movie?.serie_urls && movie.serie_urls.map(item => item.season.toString()))]
                              .sort((a, b) => Number(a) - Number(b))
                              .map(item => {
                                return (
                                  <option key={item} value={item}>
                                    სეზონი {item}
                                  </option>
                                );
                              })}
                          </select>

                          <select
                            name="serie"
                            className="rounded-md bg-primaryBlack px-4 py-2 outline-none md:min-w-44"
                            value={serie || 1}
                            onChange={e => handleSerieChoose(e)}>
                            {movie?.serie_urls &&
                              movie.serie_urls
                                .filter(item => item.season == season)
                                .sort((a, b) => Number(a) - Number(b))
                                .map((item, i) => {
                                  return (
                                    <option key={i} value={item.serie}>
                                      სერია {item.serie}
                                    </option>
                                  );
                                })}
                          </select>
                        </div>
                      ))}
                  </div>
                )}
              </>
            ) : (
              <div className="relative z-[4] flex h-full w-full items-center justify-center">
                <Loading />
              </div>
            )}

            <DefaultAudioLayout icons={defaultLayoutIcons} />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
