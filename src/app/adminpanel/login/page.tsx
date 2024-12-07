'use client';

import { qtvBack } from '@/lib/axios';
import { getUser, login, logout } from '@/lib/requests';
import Button from '@/src/components/UiComponents/Button';
import Input from '@/src/components/UiComponents/Input';
import { userInputes } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const page = () => {
  const methods = useForm<userInputes>();
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<userInputes> = async (userInput: userInputes) => {
    if (loading) return;

    setLoading(true);

    try {
      await login(userInput);
      router.push('/adminpanel');
      window.location.reload();
    } catch (error: any) {
      if (typeof error.response.data?.message === 'string') setError(error.response.data?.message);

      setTimeout(() => {
        setError('');
      }, 8000);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center pt-40">
      <FormProvider {...methods}>
        <form
          className="mx-4 flex w-full max-w-[700px] flex-col gap-4 rounded-md bg-primary px-7 py-14 lg:px-14"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-balance uppercase lg:text-xl">შესვლა</h2>

          <Input name="email" placeholder="ელ-ფოსტა" />
          <Input name="password" placeholder="პაროლი" type="password" />
          <div className="flex w-full flex-row-reverse items-center gap-3">
            <input {...register('remember')} type="checkbox" />
            <p className="smtext">დამიმახსოვრე</p>
          </div>

          <div className="h-7">
            <p className="text-red-600">{error}</p>
          </div>
          <div className="flex w-full justify-between gap-5">
            <Button type={2} title="შესვლა" handleType="submit" />
            <Button
              type={2}
              handleType="button"
              title="getUser"
              onClick={async () => {
                const data = await qtvBack.get(`${process.env.NEXT_PUBLIC_URL_API}/user`);
                console.log(data);
              }}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
