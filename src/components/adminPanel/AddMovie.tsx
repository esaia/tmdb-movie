import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import EditMovie from './EditMovie';
import toast from 'react-hot-toast';
import { storeMovie } from '@/lib/requests';
import Button from '@/src/components/UiComponents/Button';
import { MovieInput } from '@/types';

const AddMovie = ({ setActiveIndex }: { setActiveIndex: () => void }) => {
  const [error, setError] = useState(['']);
  const [loading, setLoading] = useState(false);

  const methods = useForm<MovieInput>({
    defaultValues: {
      title_ka: '',
      title_en: '',
      year: 0,
      description: '',
      imdb: '',
      poster_image: '',
      cover_image: '',
      country: '',
      minutes: '',
      tmdb_id: 0,
      movie_url: '',
      genre_ids: [],
    },
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<MovieInput> = async movie => {
    if (loading) return;

    const formData = new FormData();
    setError([]);
    setLoading(true);

    Object.entries(movie).map(item => {
      if (['poster_image', 'cover_image'].includes(item[0])) {
        formData.append(item[0], item[1][0]);
      } else if (item[0] === 'genre_ids') {
        formData.append(item[0], JSON.stringify(item[1].map((item: string) => +item)));
      } else if (item[0] === 'taxonomy_ids') {
        formData.append(item[0], JSON.stringify(item[1].map((item: string) => +item)));
      } else if (item[0] === 'status') {
        formData.append('status', item[1] === true || item[1] === 'true' ? '1' : '0');
      } else {
        formData.append(item[0], item[1]);
      }
    });

    try {
      await storeMovie(formData);
      setActiveIndex();
      toast.success('ფილმის წარმატებით დაემატა', {
        style: {
          borderRadius: '10px',
          background: '#111827',
          color: '#fff',
        },
      });
      window.location.reload();
    } catch (error: any) {
      toast.error('ფილმის დამატება ვერ მოხერხდა', {
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
          <EditMovie bottomButtons={bottomButtons} />
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

export default AddMovie;
