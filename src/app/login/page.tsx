'use client';

import Button from '@/src/components/UiComponents/Button';
import Input from '@/src/components/UiComponents/Input';
import { userInputes } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';

const page = () => {
  const router = useRouter();

  const methods = useForm<userInputes>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = methods;

  const onSubmit: SubmitHandler<userInputes> = data => console.log(data);
  const password = useWatch({
    control,
    name: 'password',
  });

  return (
    <div className="flex items-center justify-center pt-40">
      <FormProvider {...methods}>
        <form
          className="mx-4 flex w-full max-w-[700px] flex-col gap-4 rounded-md bg-primary px-7 py-14 lg:px-14"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-balance uppercase lg:text-xl">რეგისტრაცია</h2>
          <div className="flex gap-5">
            <Input
              name="firstName"
              placeholder="სახელი"
              validation={{ minLength: { value: 5, message: 'მინიმუმ 5 სიმბოლო' } }}
            />
            <Input
              name="lastName"
              placeholder="გვარი"
              validation={{ minLength: { value: 5, message: 'მინიმუმ 5 სიმბოლო' } }}
            />
          </div>
          <Input
            name="username"
            placeholder="ნიკი"
            validation={{ minLength: { value: 5, message: 'მინიმუმ 5 სიმბოლო' } }}
          />
          <Input
            name="email"
            placeholder="ელ-ფოსტა"
            validation={{
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'ელ-ფოსტა არასწორია',
              },
            }}
          />
          <div className="flex gap-5">
            <Input name="password" placeholder="პაროლი" type="password" />
            <Input
              name="repeatPassowrd"
              placeholder="გაიმეორეთ პაროლი"
              type="password"
              validation={{ validate: value => value === password || 'პაროლი არ ემთხვევა' }}
            />
          </div>
          <span className="smtext flex justify-end gap-2 py-5 text-gray-400">
            დაგავიწყდა პაროლი?
            <Link className="text-blue-500 underline" href={'/register'}>
              აღადგინე
            </Link>
          </span>
          <div className="h-7">
            <p className="text-red-600">error</p>
          </div>
          <div className="flex w-full justify-between gap-5">
            <Button type={3} title="შესვლა" onClick={() => router.push('/login')} handleType="button" />
            <Button type={2} title="რეგისტრაცია" handleType="submit" />
          </div>
          <p className="text-center">ან</p>
          <div className="flex cursor-pointer items-center justify-center gap-4 rounded-md border-[1px] border-white px-4 py-3">
            <FaGoogle />
            <p>შედით გუგლის ექაუნთით</p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
