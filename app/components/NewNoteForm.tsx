'use client';

import IconButton from './IconButton';
import { useState } from 'react';
import { addNote } from '../actions';
import { FaRegWindowClose, FaRegCheckSquare } from 'react-icons/fa';

interface NewNoteFormProps {
  onClose: () => void;
}

const NewNoteForm = ({ onClose }: NewNoteFormProps) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = () => setIsDisabled(false);

  return (
    <form action={addNote} onSubmit={onClose} className='space-y-4'>
      <h1 className='text-xl font-semibold'>Another brilliant idea</h1>
      <input
        placeholder='Meaningful title'
        type='text'
        name='title'
        className='w-full bg-white p-2 caret-[bg-theme-primary] focus:outline-none'
        onChange={handleChange}
      />
      <textarea
        placeholder='Important thoughts'
        name='content'
        className='w-full bg-white p-2 caret-[bg-theme-primary] focus:outline-none'
        onChange={handleChange}
      />
      <div className='flex items-center space-x-1'>
        <input
          type='checkbox'
          name='important'
          className='accent-theme-primary cursor-pointer'
        />
        <label className='text-sm md:text-base'>
          Is it reeeaaaally important?
        </label>
      </div>

      <div className='mt-4 flex justify-between'>
        <IconButton
          icon={<FaRegWindowClose size={20} />}
          alert={true}
          onClick={onClose}
        />
        <IconButton
          icon={<FaRegCheckSquare size={20} />}
          disabled={isDisabled}
          submit={true}
        />
      </div>
    </form>
  );
};

export default NewNoteForm;
