import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

import { TModalUIProps } from './type';
import { MainButton } from 'src/shared/ui/MainButton';
import { CloseIcon } from './ui/CloseIcon';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div
    className=' fixed top-0 right-0 left-0 bottom-0 z-40 bg-black-900 opacity-[60%]'
    onClick={onClick}
    data-cy='closeOverlay'
  />
);

export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, children }) => (
    <>
      <div
        className=' modal w-[90%] md:w-max md:max-w-[50%] 2xl:min-w-[600px] px-8 py-10 lg:px-12 lg:pt-10 lg:pb-14'
        data-cy='modal-auth'
      >
        <div className=' flex items-center justify-end text-accent_green  '>
          <button
            className=' flex size-6 lg:size-7 xl:size-8 2xl:size-9 outline-none rounded-full hover:text-green-600 hover:shadow-green-400 hover:shadow-sm border-none cursor-pointer p-0 items-center'
            type='button'
            data-cy='closeX'
            onClick={onClose}
          >
            <CloseIcon className='size-6 lg:size-7 xl:size-8 2xl:size-9 ' />
          </button>
        </div>
        <div className=' flex flex-col items-center'>{children}</div>
      </div>
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);

export type TModalProps = {
  title: string;
  onClose: () => void;
  children?: ReactNode;
};

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
