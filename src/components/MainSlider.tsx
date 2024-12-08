'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import Button from '@/src/components/UiComponents/Button';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/autoplay';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Link from 'next/link';
import { MovieType } from '@/types';
import { generateSlug } from '@/lib/helpers';

const MainSlider = ({ movies, genres }: { movies: MovieType[]; genres: { id: number; name: string }[] }) => {
  const [activeMovie, setactiveMovie] = useState<MovieType>(movies[1]);
  const animationDiv = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  const [isAnimating, setisAnimating] = useState(false);

  const activeMovieGenres = useMemo(() => {
    return genres.filter((genre: any) => activeMovie.genre_ids.includes(genre?.id));
  }, [activeMovie]);

  return (
    <div className="relative flex w-full flex-col justify-start overflow-hidden transition-all duration-500 md:h-[900px]">
      <div className="z-[4] mx-auto flex w-full max-w-max_width flex-col gap-3 lg:mt-[290px] lg:flex-row 2xl:mt-[380px]">
        <div className="mainContainer mt-40 flex h-full min-h-48 flex-1 items-center lg:-mt-40">
          {activeMovie && (
            <div className="flex w-fit max-w-[600px] flex-col gap-2 transition-all lg:gap-6" ref={detailsRef}>
              <div className="flex flex-col gap-2">
                <div>
                  <h2 className="title mb-1 line-clamp-2 font-bold uppercase">{activeMovie?.title}</h2>
                </div>

                {/* <div className="flex items-center gap-2">
                  <p>{format(activeMovie.release_date, 'y')}</p>
                </div> */}
              </div>

              {activeMovieGenres.length ? (
                <div className="flex items-center gap-1">
                  {activeMovieGenres.map((genre: any) => (
                    <p key={genre?.id} className="rounded-md p-1 text-sm text-white/90 underline">
                      {genre?.name}
                    </p>
                  ))}
                </div>
              ) : (
                <></>
              )}

              <p className="line-clamp-3 text-sm opacity-90 lg:line-clamp-4">{activeMovie?.overview}</p>

              <Link href={`movie/${generateSlug(activeMovie)}`}>
                <Button title="Watch now" />
              </Link>
            </div>
          )}
        </div>

        <div className="flex h-full max-w-[100%] flex-1 flex-col justify-between lg:max-w-[50%]">
          <h3 className="mainContainer title py-4 uppercase lg:px-5">Popular</h3>
          <SliderSwiper
            activeMovie={activeMovie}
            setactiveMovie={setactiveMovie}
            movies={movies}
            isAnimating={isAnimating}
            setisAnimating={setisAnimating}
          />
        </div>
      </div>

      <div
        ref={animationDiv}
        className="absolute bottom-0 left-0 z-[3] h-[100%] w-full translate-y-[-130%] bg-black align-middle"
      />
      <div className="absolute bottom-0 left-0 z-[3] h-[120%] w-full scale-110 bg-gradient-to-b from-black/60 via-gray-950/70 to-black" />

      {activeMovie &&
        movies.map(movie => {
          return (
            <Image
              key={movie.id}
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              width={500}
              height={400}
              priority={true}
              className={`absolute left-0 top-0 z-[2] h-[98%] w-full object-cover object-center opacity-0 transition-all duration-300 ${activeMovie.id === movie.id && 'opacity-100'} `}
            />
          );
        })}
    </div>
  );
};

export default MainSlider;

const SliderSwiper = ({
  activeMovie,
  setactiveMovie,
  movies,
  isAnimating,
  setisAnimating,
}: {
  activeMovie: MovieType;
  setactiveMovie: React.Dispatch<React.SetStateAction<MovieType>>;
  movies: MovieType[];
  isAnimating: boolean;
  setisAnimating: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [mainSwiperInstance, setMainSwiperInstance] = useState<SwiperType | null>(null);
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(-1);
  const timeoutRef = useRef<number | null>(null);

  const onSwiper = (swiper: SwiperType) => {
    setMainSwiperInstance(swiper);

    swiperSlidesDom(swiper);
  };

  const onSlideChange = (swiper: SwiperType) => {
    swiperSlidesDom(swiper);
  };

  const swiperSlidesDom = (swiper: SwiperType) => {
    const slides = swiper.slides;

    const findActiveMovieIndex = movies.findIndex(movie => movie?.id === activeMovie?.id);
    const swiperActiveIndexAttr = Number(slides[swiper.activeIndex + 1]?.getAttribute('data-swiper-slide-index'));

    if (swiperActiveIndexAttr !== swiperActiveIndex) {
      setSwiperActiveIndex(swiperActiveIndexAttr);
      setisAnimating(!isAnimating);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (findActiveMovieIndex >= 0 && swiperActiveIndexAttr >= 0) {
      if (findActiveMovieIndex === swiperActiveIndexAttr) return;
    }

    timeoutRef.current = window.setTimeout(() => {
      setactiveMovie(movies[swiperActiveIndexAttr]);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        className="w-full flex-1 !px-2"
        grabCursor={true}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        navigation={{
          nextEl: '.navigationNext',
          prevEl: '.navigationPrev',
        }}
        loop={true}
        onSwiper={swiper => onSwiper(swiper)}
        onSlideChange={swiper => onSlideChange(swiper)}
        modules={[Autoplay]}>
        {movies.map((slide, i) => {
          return (
            <SwiperSlide
              key={i}
              className={`!w-[160px] px-1 !transition-all sm:!w-[180px] lg:!w-[240px] lg:px-3 ${
                activeMovie && (activeMovie?.id === slide?.id ? 'opacity-100' : 'opacity-50')
              } `}>
              <div className="flex h-full flex-col">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${slide?.poster_path}`}
                  alt="cover image"
                  width={200}
                  height={400}
                  className="!h-[230px] w-full rounded-lg object-cover sm:!h-[270px] lg:!h-[330px]"
                  priority={true}
                />
                <div
                  className={`flex h-14 items-center justify-center border-b border-b-transparent px-1 py-2 transition-all duration-300 ${
                    activeMovie && activeMovie.id === slide.id && '!border-b-secondary'
                  } `}>
                  <p className="mt-1 line-clamp-1 text-sm font-bold transition-all group-hover:text-secondary lg:text-lg">
                    {slide?.title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        <div
          className="navigationPrev absolute -left-5 top-[50%] z-20 translate-y-[-50%] cursor-pointer"
          onClick={() => mainSwiperInstance?.slidePrev()}>
          <MdKeyboardArrowLeft className="h-16 w-16 text-gray-400 hover:text-white" />
        </div>

        <div
          className="navigationNext absolute right-0 top-[50%] z-20 translate-y-[-50%] cursor-pointer"
          onClick={() => mainSwiperInstance?.slideNext()}>
          <MdKeyboardArrowRight className="h-16 w-16 text-gray-400 hover:text-white" />
        </div>
      </Swiper>
    </>
  );
};
