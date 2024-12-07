import React, { ReactElement } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useDetectClickOutside } from 'react-detect-click-outside';

const Portal = ({ children, closeModal }: { children: ReactElement; closeModal: () => void }) => {
  const target = useDetectClickOutside({
    onTriggered: closeModal,
  });

  return (
    <div className="customScrollbar fixed z-50 flex h-full w-full cursor-pointer items-center justify-center bg-primaryBlack/70">
      <div
        ref={target}
        className="relative mx-5 max-h-[90vh] w-full max-w-[900px] cursor-default overflow-y-auto rounded-md border-[1px] border-gray-700 bg-primary px-4 py-10 shadow-lg"
      >
        <div className="absolute right-5 top-5 cursor-pointer" onClick={closeModal}>
          <IoCloseCircleSharp className="h-10 w-10" />
        </div>
        <div className="mt-5 w-full">{children}</div>
      </div>
    </div>
  );
};

export default Portal;
