'use client';

import { PiBellSimpleFill, PiBellSimpleBold } from 'react-icons/pi';

interface ImportantButtonProps {
  isImportant: boolean;
  onClick: (important: boolean) => void;
}

const ImportantButton = ({ isImportant, onClick }: ImportantButtonProps) => {
  return (
    <button onClick={() => onClick(!isImportant)} className='cursor-pointer'>
      {isImportant ? (
        <PiBellSimpleFill size={20} />
      ) : (
        <PiBellSimpleBold size={20} />
      )}
    </button>
  );
};

export default ImportantButton;
