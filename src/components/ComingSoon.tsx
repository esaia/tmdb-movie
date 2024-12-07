'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import Image from 'next/image';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { LuPopcorn } from 'react-icons/lu';
import { useInView } from 'react-intersection-observer';
import { MovieType } from '@/types';

const ComingSoon = ({ movies }: { movies: MovieType[] }) => {
  const [activeMovie, setactiveMovie] = useState<MovieType>(movies?.[0]);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [commingSoonSwiper, setCommingSoonSwiper] = useState<SwiperType | null>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const swiperRef = useRef<SwiperType>();
  const timeoutRef = useRef<number | null>(null);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.2,
  });

  const onSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    setCommingSoonSwiper(swiper);
    swiperSlidesDom(swiper, true);
  };

  const onSlideChange = (swiper: SwiperType) => {
    swiperSlidesDom(swiper);
  };

  const swiperSlidesDom = (swiper: SwiperType, isInitial: boolean = false) => {
    const slides = swiper.slides;

    const findActiveMovieIndex = movies.findIndex(movie => movie?.id === activeMovie?.id);
    const swiperActiveIndex = Number(slides[swiper?.activeIndex]?.getAttribute('data-swiper-slide-index'));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!isInitial) {
      if (findActiveMovieIndex >= 0 && swiperActiveIndex >= 0) {
        if (findActiveMovieIndex === swiperActiveIndex) return;
      }
    }

    setBackgroundOpacity(0);

    timeoutRef.current = window.setTimeout(() => {
      setBackgroundOpacity(1);

      setactiveMovie(movies[swiperActiveIndex]);

      slides.forEach(slide => {
        const check = ['swiper-slide-active', 'swiper-slide-next', 'swiper-slide-prev'].some(className =>
          Array.from(slide.classList).includes(className),
        );
        if (check) {
          if (slide.classList.contains('swiper-slide-active')) {
            if (!setactiveMovie) return;
          }

          slide.style.opacity = '1';
        } else {
          slide.style.opacity = '0.5';
        }
      });
    }, 400);
  };

  const breakpoints = useMemo(() => {
    return {
      0: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      400: {
        slidesPerView: 2,
        spaceBetween: 10,
      },

      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 18,
      },

      1280: {
        slidesPerView: 4,
        spaceBetween: 20,
      },

      1700: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
      2200: {
        slidesPerView: 6,
        spaceBetween: 30,
      },
    };
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative transition-all duration-500 ${inView ? 'blur-0' : 'blur-sm'} `} ref={ref}>
      <div
        className="absolute left-0 top-0 h-full w-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 md:bg-fixed"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_URL}/storage/${activeMovie.cover_image})   `,
          opacity: backgroundOpacity,
        }}
      />

      <div className="absolute -top-1 left-0 h-[calc(100%+7px)] w-full bg-primary/70" />

      <div className="mainContainer m-auto max-w-max_width">
        <div className="relative flex items-center gap-3 py-5 lg:py-10">
          <div className="title rounded-full bg-secondary p-2 lg:p-3">
            <LuPopcorn />
          </div>

          <h3 className="title relative py-4 uppercase">მალე</h3>
        </div>

        <Swiper
          breakpoints={breakpoints}
          // slidesPerView={3}
          //   spaceBetween={20}
          onTouchStart={e => setIsGrabbing(true)}
          onTouchEnd={e => setIsGrabbing(false)}
          loop={true}
          speed={800}
          centeredSlides={true}
          grabCursor={true}
          onSwiper={swiper => onSwiper(swiper)}
          onSlideChange={swiper => onSlideChange(swiper)}
        >
          {movies.map(movie => {
            return (
              <SwiperSlide className="!h-ful !duration-600 pb-10 opacity-50 !transition-all" key={movie.id}>
                <div className={`flex flex-col transition-all duration-300 ${isGrabbing ? 'scale-90' : 'scale-100'} `}>
                  <div>
                    <Image
                      width={200}
                      height={400}
                      src={`${process.env.NEXT_PUBLIC_URL}/storage/${movie.poster_image}`}
                      alt={movie.title_ka}
                      className="h-[200px] w-full flex-1 rounded-sm object-cover md:h-[400px] lg:h-[500px]"
                    />
                  </div>

                  <p className="text line-clamp-2 px-1 pt-2 text-left">{movie.title_ka}</p>
                </div>
              </SwiperSlide>
            );
          })}

          <div
            className="navigationPrev absolute -left-3 top-[50%] z-20 translate-y-[-50%] cursor-pointer"
            onClick={() => commingSoonSwiper?.slidePrev()}
          >
            <MdKeyboardArrowLeft className="h-16 w-16 text-gray-200 hover:text-white" />
          </div>

          <div
            className="navigationNext absolute right-0 top-[50%] z-20 translate-y-[-50%] cursor-pointer"
            onClick={() => commingSoonSwiper?.slideNext()}
          >
            <MdKeyboardArrowRight className="h-16 w-16 text-gray-200 hover:text-white" />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default ComingSoon;
