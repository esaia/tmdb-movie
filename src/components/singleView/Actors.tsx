'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { TmdbType } from '@/types';
import { getMovieActors } from '@/lib/requests';
import { FaTheaterMasks } from 'react-icons/fa';

const Actors = ({ tmdbId }: { tmdbId: number }) => {
  const [actors, setactors] = useState<TmdbType[]>([]);

  useEffect(() => {
    const fetchActores = async () => {
      try {
        const movieActors = await getMovieActors(tmdbId);
        setactors(movieActors?.cast);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActores();
  }, []);

  return (
    <div className="overflow-hidden">
      {actors.length ? (
        <div className="mainContainer m-auto w-full max-w-max_width">
          <div className="mb-5 flex items-center gap-3">
            <div className="title rounded-full bg-secondary p-2 lg:p-3">
              <FaTheaterMasks />
            </div>
            <h3 className="title uppercase">Casts</h3>
          </div>

          <Swiper slidesPerView={'auto'} speed={1000} grabCursor={true} className="!overflow-visible">
            {actors?.map((actor, i) => {
              return (
                <SwiperSlide key={i} className="!w-fit pr-2 lg:pr-6">
                  <Image
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                        : `/images/masks.png`
                    }
                    width={500}
                    height={500}
                    alt={actor.name}
                    className="mb-3 aspect-square h-28 w-24 rounded-md object-cover lg:h-36 lg:w-28"
                  />
                  <p className="line-clamp-1 max-w-28 text-xs">{actor.name}</p>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Actors;
