'use client';
import React, { ReactElement, useEffect, useState } from 'react';
import Input from '@/src/components/UiComponents/Input';
import Image from 'next/image';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import Switch from 'react-switch';
import TmdbSelect from '@/src/components/adminPanel/customInputes/TmdbSelect';
import TaxonomySelect from '@/src/components/adminPanel/customInputes/TaxonomySelect';
import GenreSelect from '@/src/components/adminPanel/customInputes/GenreSelect';
import { MovieInput } from '@/types';
interface PropsType {
  bottomButtons: ReactElement;
}

const EditMovie = ({ bottomButtons }: PropsType) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<MovieInput>();

  const [posterImage, setPosterImage] = useState<any>(null);
  const [coverImage, setCoverImage] = useState<any>(null);

  const cover = useWatch({ name: 'cover_image' });
  const poster = useWatch({ name: 'poster_image' });
  const status = useWatch({ name: 'status' });

  useEffect(() => {
    // const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    if (typeof poster === 'string' && poster.startsWith('http')) {
      setPosterImage(poster);
    } else if (typeof poster[0] === 'object') {
      setPosterImage(URL.createObjectURL(poster[0]));
    }

    if (typeof cover === 'string' && cover.startsWith('http')) {
      setCoverImage(cover);
    } else if (typeof cover[0] === 'object') {
      setCoverImage(URL.createObjectURL(cover[0]));
    }
  }, [cover, poster]);

  return (
    <div className="flex flex-col gap-7">
      <div className="flex w-full gap-5">
        <Input name={'title_ka'} label={'ქართული სათაური'} placeholder={'ღმერთი არ არის მკვდარი'} />
        <Input name={'title_en'} label={'ინგლისური სათაური'} placeholder={"god's not dead"} />
      </div>

      <div className="flex w-full gap-5">
        <Input name={'movie_url'} label={'ფილმის ლინკი'} placeholder={'https://ge.movie/movie/49313/retribution'} />
        <GenreSelect />
        <TaxonomySelect />
        <Input name={'director'} label={'რეჟისორი'} placeholder={'Christopher Nolan'} />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          ფილმის აღწერა
        </label>
        <textarea
          {...register('description', {
            required: { value: true, message: 'ეს ველი სავალდებულოა' },
          })}
          id="message"
          className="flex w-full items-center rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 outline-none"
          placeholder="ფილმის სიუჟეტი შეეხება ქრისტიან სტუდენტსა და ფილოსოფიის კურსის ათეისტ ლექტორს..."
        ></textarea>
        <p className="smtext mt-[5px] h-2 text-red-500">{errors?.['description']?.message as string}</p>
      </div>

      <div className="flex w-full gap-5">
        <Input name={'imdb'} label={'imdb'} placeholder={'9.9'} type="" />
        <TmdbSelect />
        <Input name={'year'} label={'წელი'} placeholder={'2023'} type="number" />
      </div>
      <div className="flex gap-4">
        <Input name={'country'} label={'ქვეყანა'} placeholder={'united states'} />
        <Input name={'minutes'} label={'წუთი'} placeholder={'138'} type="number" />
      </div>

      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-1 flex-col items-start justify-start">
          <div className="w-fit">
            <Input name={'cover_image'} label={'ქოვერ სურათი'} placeholder={''} type="file" />
          </div>

          <div className="h-32 w-48">
            {coverImage && (
              <Image
                src={coverImage}
                width={1080}
                height={1920}
                alt="poster image"
                className="mt-5 h-full w-full flex-1 rounded-md object-cover"
              />
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-start">
          <div className="w-fit">
            <Input name={'poster_image'} label={'პოსტერ სურათი'} placeholder={''} type="file" />
          </div>

          <div className="h-40 w-32 overflow-hidden rounded-md">
            {posterImage && (
              <Image
                src={posterImage}
                width={1080}
                height={1920}
                alt="poster image"
                className="h-full w-full flex-1 object-cover"
              />
            )}
          </div>
        </div>
      </div>

      <Controller
        name="status"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <Switch
            checked={status || false}
            onChange={value => field.onChange(value)}
            onColor="#86d3ff"
            onHandleColor="#173952"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        )}
      />

      <div className="flex w-full flex-row-reverse justify-between gap-20 pt-10">{bottomButtons}</div>
    </div>
  );
};

export default EditMovie;
