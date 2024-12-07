import React, { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { LuEye, LuEyeOff } from 'react-icons/lu';

interface PropsType {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  validation?: RegisterOptions;
}

const Input = ({ name = '', label = '', placeholder = '', type = 'text', validation }: PropsType) => {
  const [tooglePassword, setTooglePassword] = useState(false);
  const { register, formState } = useFormContext();
  const { errors } = formState;

  return (
    <div className="flex-1">
      <label htmlFor={label} className="text mb-2 block text-sm font-medium text-white">
        {label}
      </label>
      <div className="flex w-full items-center rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400">
        <input
          {...register(name, {
            valueAsNumber: (type === 'number') as any,
            required: { value: type !== 'file', message: 'ეს ველი აუცილებელია' },
            ...validation,
          })}
          className="text flex-1 bg-transparent outline-none"
          // value={value}
          type={type === 'password' ? (tooglePassword ? 'text' : 'password') : type}
          name={name}
          // onChange={e => change(e)}
          placeholder={placeholder}
          // onBlur={() => setIsInputActive && setIsInputActive(false)}
        />
        {type === 'password' && (
          <div className="cursor-pointer pl-2" onClick={() => setTooglePassword(!tooglePassword)}>
            {tooglePassword ? <LuEye /> : <LuEyeOff />}
          </div>
        )}
      </div>
      <p className="smtext mt-[5px] h-2 text-red-500">{errors?.[name]?.message as string}</p>
    </div>
  );
};

export default Input;
