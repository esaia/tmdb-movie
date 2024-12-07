'use client';
import { deleteTaxonomy, editTaxonomy, getTaxonomies } from '@/lib/requests';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Portal from './Portal';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '@/src/components/UiComponents/Input';
import Button from '@/src/components/UiComponents/Button';
import { Taxonomy } from '@/types';

const CategoryTable = () => {
  const [openModal, setOpenModal] = useState(false);

  const [currentTaxonomy, setCurrentTaxonomy] = useState<Taxonomy>();
  const [taxonomies, setTaxonomies] = useState<Taxonomy[]>([]);

  const [error, setError] = useState(['']);
  const [loading, setLoading] = useState(false);

  const methods = useForm<Taxonomy>();

  const { handleSubmit, setValue } = methods;

  const setDefaultValues = (taxonomy: Taxonomy) => {
    if (!taxonomy) return;
    setValue('name', taxonomy?.name);
    setValue('slug', taxonomy?.slug);
  };

  const fetchTaxonomies = async () => {
    const data = await getTaxonomies();
    setTaxonomies(data);
  };

  const onSubmitTaxonomyEdit: SubmitHandler<Taxonomy> = async (data: Taxonomy) => {
    try {
      setError([]);
      if (!currentTaxonomy?.id) return;
      await editTaxonomy(data, currentTaxonomy?.id);

      toast.success('კატეგორია შეიცვალა', {
        style: {
          borderRadius: '10px',
          background: '#111827',
          color: '#fff',
        },
      });
      fetchTaxonomies();
      setOpenModal(false);
    } catch (error: any) {
      toast.error('კატეგორიის ცვლილება ვერ მოხერხდა', {
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

      setLoading(false);
    }
  };

  const onDelede = async () => {
    try {
      if (!currentTaxonomy?.id) return;
      await deleteTaxonomy(currentTaxonomy?.id);
      fetchTaxonomies();
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTaxonomies();
  }, []);

  return (
    <div className="overflow-hidden rounded-md">
      <table className="w-full text-left text-sm text-gray-400 rtl:text-right">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="cursor-pointer px-6 py-3">
              სახელი
            </th>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="w-20 px-6 py-3">
              კონფიგურაცია
            </th>
          </tr>
        </thead>
        <tbody>
          {taxonomies.map((taxonomy, i) => {
            return (
              <tr key={i} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <th scope="row" className="whitespace-nowrap px-6 text-white">
                  <p className="">{taxonomy.name}</p>
                </th>

                <th scope="row" className="whitespace-nowrap px-6 font-medium text-gray-900 dark:text-white">
                  {taxonomy.slug}
                </th>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <div
                      className="cursor-pointer px-6 uppercase hover:underline"
                      onClick={() => {
                        setOpenModal(true);
                        setDefaultValues(taxonomy);
                        setCurrentTaxonomy(taxonomy);
                      }}
                    >
                      Edit
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openModal &&
        createPortal(
          <Portal closeModal={() => setOpenModal(false)}>
            <>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitTaxonomyEdit)}>
                  <div className="my-5 cursor-text text-xs text-gray-300">
                    <p>Trending ID: trending</p>
                    <p>coming soon ID: coming_soon</p>
                  </div>
                  <div className="flex gap-4">
                    <Input name="name" label="კატეგორიის სახელი" />
                    <Input name="slug" label="კაგეგორიის id" />
                  </div>
                  <div className="flex w-full justify-end">
                    <div className="flex w-fit items-center gap-5">
                      <div onDoubleClick={() => onDelede()}>
                        <Button type={3} title="წაშლა" handleType="button" />
                      </div>
                      <Button type={2} title="ცვლილება" handleType="submit" />
                    </div>
                  </div>
                </form>
                <div className="text-red-500">
                  {error?.map(err => {
                    return <div key={err}>{err}</div>;
                  })}
                </div>
              </FormProvider>
            </>
          </Portal>,
          document.querySelector('.portal') as HTMLDivElement,
        )}
    </div>
  );
};

export default CategoryTable;
