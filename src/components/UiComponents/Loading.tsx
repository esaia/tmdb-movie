import React from 'react';

const Loading = () => {
  return (
    <div className="flex h-fit items-center justify-center space-x-2">
      <div className="h-[8px] w-[8px] animate-bounce rounded-full bg-secondary [animation-delay:-0.3s]"></div>
      <div className="h-[8px] w-[8px] animate-bounce rounded-full bg-secondary [animation-delay:-0.15s]"></div>
      <div className="h-[8px] w-[8px] animate-bounce rounded-full bg-secondary"></div>
    </div>
  );
};

export default Loading;
