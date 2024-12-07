import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { storeTaxonomy } from '@/lib/requests';
import Button from '@/src/components/UiComponents/Button';
import Input from '@/src/components/UiComponents/Input';
import { Taxonomy } from '@/types';

const AddTaxonomy = ({ onClose }: { onClose: () => void }) => {
  const [error, setError] = useState(['']);
  const [loading, setLoading] = useState(false);

  const methods = useForm<Taxonomy>();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<Taxonomy> = async taxonomy => {
    if (loading) return;
    setError([]);
    setLoading(true);

    try {
      await storeTaxonomy(taxonomy);
      onClose();
      toast.success('კატეგორია წარმატებით დაემატა', {
        style: {
          borderRadius: '10px',
          background: '#111827',
          color: '#fff',
        },
      });

      window.location.reload();
    } catch (error: any) {
      toast.error('კატეგორიის დამატება ვერ მოხერხდა', {
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

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5 cursor-text text-xs text-gray-300">
            <p>Trending ID: trending</p>
            <p>coming soon ID: coming_soon</p>
          </div>
          <div className="flex gap-4">
            <Input name="name" label="კატეგორიის სახელი" />
            <Input name="slug" label="კაგეგორიის id" />
          </div>
          <div className="flex w-full justify-end">
            <div className="w-fit">
              <Button type={2} title="შენახვა" handleType="submit" />
            </div>
          </div>
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

export default AddTaxonomy;
