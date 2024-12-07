'use client';

import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { storeSerie } from '@/lib/requests';
import Button from '@/src/components/UiComponents/Button';
import EditSeries from './EditSerie';
import { SeriesInput, serieUrl } from '@/types';

const AddSeries = ({ setActiveIndex }: { setActiveIndex: () => void }) => {
  const [error, setError] = useState(['']);
  const [loading, setLoading] = useState(false);

  const methods = useForm<SeriesInput>({
    defaultValues: {
      title_ka: '',
      title_en: '',
      year: 0,
      description: '',
      director: '',
      imdb: '',
      poster_image: '',
      cover_image: '',
      country: '',
      minutes: '',
      tmdb_id: 0,
      genre_ids: [],
      serie_urls: [],
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<SeriesInput> = async serie => {
    if (loading) return;

    const formData = new FormData();
    setError([]);
    setLoading(true);

    // Object.entries(serie).map(item => {
    //   if (['poster_image', 'cover_image'].includes(item[0])) {
    //     formData.append(item[0], item[1][0]);
    //   } else if (item[0] === 'genre_ids') {
    //     formData.append(item[0], JSON.stringify(item[1].map((item: string) => +item)));
    //   } else if (item[0] === 'taxonomy_ids') {
    //     formData.append(item[0], JSON.stringify(item[1].map((item: string) => +item)));
    //   } else if (item[0] === 'serie_urls') {
    //     formData.append(item[0], JSON.stringify(item[1].map((item: string) => +item)));
    //   } else if (item[0] === 'status') {
    //     formData.append('status', item[1] === true || item[1] === 'true' ? '1' : '0');
    //   } else {
    //     formData.append(item[0], item[1]);
    //   }
    // });

    Object.keys(serie).forEach((key: string) => {
      const value = serie[key as keyof SeriesInput];

      switch (key) {
        case 'poster_image':
        case 'cover_image':
          // @ts-ignore
          formData.append(key, value[0] as string);
          break;
        case 'genre_ids':
        case 'taxonomy_ids':
          formData.append(key, JSON.stringify(value));
          break;
        case 'serie_urls':
          (value as serieUrl[]).forEach((series, index) => {
            for (let key in series) {
              // @ts-ignore
              formData.append(`serie_urls[${index}][${key}]`, series[key]);
            }
          });
          //   formData.append(key, JSON.stringify(value));
          break;
        case 'status':
          formData.append('status', value === true || value === 'true' ? '1' : '0');
          break;
        default:
          formData.append(key, value as string);
          break;
      }
    });

    try {
      await storeSerie(formData);
      setActiveIndex();

      // toast.success('სერიალის წარმატებით დაემატა', {
      //   style: {
      //     borderRadius: '10px',
      //     background: '#111827',
      //     color: '#fff',
      //   },
      // });
      // window.location.reload();
    } catch (error: any) {
      toast.error('სერიალის დამატება ვერ მოხერხდა', {
        style: {
          borderRadius: '10px',
          background: '#111827',
          color: '#fff',
        },
      });
      if (
        error &&
        error?.response?.data?.data &&
        // @ts-ignore
        typeof Object.values(error?.response?.data?.data)?.[0]?.[0] === 'string'
      ) {
        setError((Object.values(error?.response?.data.data) as string[]).map(item => item[0]));
      } else {
        setError(['something went wrong']);
      }
    }

    setLoading(false);
  };

  const bottomButtons = (
    <div className="w-fit">
      <Button type={2} title="შენახვა" handleType="submit" />
    </div>
  );

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EditSeries bottomButtons={bottomButtons} />
        </form>
        <div className="text-red-500">
          {error?.map(err => {
            return <div key={err}>{err}</div>;
          })}
        </div>
      </FormProvider>
    </div>
  );
};

export default AddSeries;
