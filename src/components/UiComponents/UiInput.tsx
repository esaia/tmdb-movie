import React, { useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { LuEye, LuEyeOff } from 'react-icons/lu';

interface PropsType {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  validation?: RegisterOptions;
  value: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UiInput = ({ name = '', label = '', value, placeholder = '', change, type = 'text', validation }: PropsType) => {
  const [tooglePassword, setTooglePassword] = useState(false);

  return (
    <div className="flex-1">
      <label htmlFor={label} className="text mb-2 block text-sm font-medium text-white">
        {label}
      </label>
      <div className="flex w-full items-center rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400">
        <input
          className="text flex-1 bg-transparent outline-none"
          value={value}
          type={type === 'password' ? (tooglePassword ? 'text' : 'password') : type}
          name={name}
          onChange={e => change(e)}
          id={label}
          placeholder={placeholder}
          // onBlur={() => setIsInputActive && setIsInputActive(false)}
        />
        {type === 'password' && (
          <div className="cursor-pointer pl-2" onClick={() => setTooglePassword(!tooglePassword)}>
            {tooglePassword ? <LuEye /> : <LuEyeOff />}
          </div>
        )}
      </div>
    </div>
  );
};

export default UiInput;
