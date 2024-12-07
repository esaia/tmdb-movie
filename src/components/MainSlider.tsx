'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';

import Button from '@/src/components/UiComponents/Button';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/autoplay';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';
import Link from 'next/link';
import { MovieType, Taxonomy } from '@/types';
import { formatDuration, generateSlug } from '@/lib/helpers';

const MainSlider = ({ movies }: { movies: MovieType[] }) => {
  const [activeMovie, setactiveMovie] = useState<MovieType>(movies[1]);

  const animationDiv = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const backgroundImgRef = useRef<HTMLImageElement | null>(null);

  const timeoutRef = useRef<number | null>(null);
  const [count, setCount] = useState(0);
  const isMountingRef = useRef(false);

  const [isAnimating, setisAnimating] = useState(false);

  useEffect(() => {
    setCount(count => count + 1);
    if (count === 2) {
      isMountingRef.current = true;
    }
  }, [isAnimating]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!isMountingRef.current) return;

    if (!backgroundImgRef.current || !detailsRef.current || !animationDiv.current || !activeMovie) return;
    //  rotate(3deg) scale(1.8)
    animationDiv.current.style.transition = 'all cubic-bezier(0.51,-0.2, 0.09, 0.79) 0.2s';
    animationDiv.current.style.transform = 'translateY(-10%) rotate(3deg) scale(1.4)';

    backgroundImgRef.current.style.transition = 'all cubic-bezier(0.51,-0.2, 0.09, 0.79) 0.4s 0.02s';
    backgroundImgRef.current.style.opacity = '0.5';
    backgroundImgRef.current.style.transform = 'translateY(30px)';

    detailsRef.current.style.transition = 'all cubic-bezier(0.51,-0.2, 0.09, 0.79) 0s';
    detailsRef.current.style.opacity = '0';

    // detailsRef.current.style.transform = 'translateY(3px)';

    // rotate(1deg) scale(1.8)
    timeoutRef.current = window.setTimeout(() => {
      if (!animationDiv.current || !backgroundImgRef.current || !detailsRef.current) return;
      animationDiv.current.style.transition = 'all cubic-bezier(0.51,-0.2, 0.09, 0.79) 2s';
      animationDiv.current.style.transform = 'translateY(-130%) rotate(1deg) scale(1.4)';

      backgroundImgRef.current.style.opacity = '1';
      backgroundImgRef.current.style.transition = 'all cubic-bezier(0.51,-0.2, 0.09, 0.79) 3s .2s';
      backgroundImgRef.current.style.transform = 'translateY(0px)';

      detailsRef.current.style.transition = 'all cubic-bezier(0.51,-0.2, 0.09, 0.79) 2s .5s';
      detailsRef.current.style.opacity = '1';
      // detailsRef.current.style.transform = 'translateY(0px)';
    }, 200);
  }, [isAnimating]);

  return (
    <div className="relative flex w-full flex-col justify-start overflow-hidden transition-all duration-500 md:h-[900px]">
      <div className="z-[4] mx-auto flex w-full max-w-max_width flex-col gap-3 lg:mt-[290px] lg:flex-row 2xl:mt-[380px]">
        <div className="mainContainer mt-40 flex h-full min-h-48 flex-1 items-center lg:-mt-40">
          {activeMovie && (
            <div className="flex w-fit max-w-[600px] flex-col gap-2 transition-all lg:gap-6" ref={detailsRef}>
              <div className="flex flex-col gap-2">
                <div>
                  <h2 className="title mb-1 line-clamp-2 font-bold uppercase">{activeMovie?.title_ka}</h2>
                  <h2 className="title line-clamp-2 font-bold uppercase">{activeMovie?.title_en}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-sm">{activeMovie?.year} წელი</p>
                  <GoDotFill className="w-2 !text-sm" />
                  <p className="text-sm">{formatDuration(activeMovie.minutes)}</p>
                </div>

                <div className="flex items-center gap-1">
                  {activeMovie?.genres.map(genre => (
                    <p key={genre.id} className="rounded-md p-1 text-sm text-white/90 underline">
                      {genre.genre}
                    </p>
                  ))}
                </div>
              </div>
              <p className="line-clamp-3 text-sm opacity-90 lg:line-clamp-4">{activeMovie.description}</p>

              <Link href={`movie/${generateSlug(activeMovie)}`}>
                <Button title="უყურე ფილმს" />
              </Link>
            </div>
          )}
        </div>

        <div className="flex h-full max-w-[100%] flex-1 flex-col justify-between lg:max-w-[50%]">
          <h3 className="mainContainer title py-3 uppercase lg:px-5">პოპულალური</h3>
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

      {activeMovie && (
        <Image
          alt={activeMovie.title_ka}
          src={`${process.env.NEXT_PUBLIC_URL}/storage/${activeMovie.cover_image}`}
          width={1920}
          height={1080}
          ref={backgroundImgRef}
          priority={true}
          className="absolute left-0 top-0 z-[2] h-[98%] w-full object-cover object-center transition-all duration-300"
        />
      )}
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
                  src={`${process.env.NEXT_PUBLIC_URL}/storage/${slide.poster_image}`}
                  alt="cover image"
                  width={200}
                  height={400}
                  className="!h-[230px] w-full rounded-sm object-cover sm:!h-[270px] lg:!h-[330px]"
                  priority={true}
                />
                <div
                  className={`h-14 border-b border-b-transparent px-1 py-2 transition-all duration-300 ${
                    activeMovie && activeMovie.id === slide.id && '!border-b-secondary'
                  } `}>
                  <p className={`smtext line-clamp-2 text-center font-bold uppercase`}>{slide?.title_ka}</p>
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
