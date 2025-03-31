'use client';

import { RiStickyNoteAddLine } from 'react-icons/ri';

interface NewNoteButtonProps {
  onClick: () => void;
}

const NewNoteButton = ({ onClick }: NewNoteButtonProps) => {
  return (
    <button onClick={onClick} className={`focus:outline-none`}>
      <div className='bg-theme-primary text-theme-note flex h-10 w-10 cursor-pointer items-center justify-center rounded-md mx-6'>
        <RiStickyNoteAddLine size={20} />
      </div>
    </button>
  );
};

export default NewNoteButton;
