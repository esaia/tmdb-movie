import React, { ReactNode } from 'react';

const Button = ({
  title,
  type = 1,
  onClick,
  handleType = 'submit',
}: {
  title: string;
  type?: number;
  onClick?: () => void;
  handleType?: 'submit' | 'reset' | 'button' | undefined;
}) => {
  return (
    <>
      {type === 1 && (
        <div className="text group relative inline-flex w-fit uppercase">
          <div className="transitiona-all animate-tilt absolute -inset-px rounded-xl from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-70 blur-lg duration-1000 group-hover:-inset-1 group-hover:opacity-100 group-hover:duration-200 lg:bg-gradient-to-r" />
          <button
            onClick={onClick}
            aria-label={title}
            className="text relative inline-flex items-center justify-center rounded-sm border-[1px] border-secondary/40 bg-gray-900 px-3 py-2 text-white transition-all duration-200 hover:bg-primaryBlack focus:outline-none active:scale-95 active:bg-primary lg:px-8 lg:py-4"
          >
            {title}
          </button>
        </div>
      )}

      {type === 2 && (
        <button
          className="text w-full rounded-md bg-primaryBlack px-7 py-3 hover:bg-primaryBlack/70 active:bg-black"
          type={handleType}
          aria-label={title}
          onClick={onClick}
        >
          {title}
        </button>
      )}

      {type === 3 && (
        <button
          className="text w-full rounded-md bg-secondary px-7 py-3 hover:bg-secondary/70 active:bg-red-500"
          type={handleType}
          aria-label={title}
          onClick={onClick}
        >
          {title}
        </button>
      )}
    </>
  );
};

export default Button;
