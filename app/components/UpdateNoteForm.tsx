'use client';

import IconButton from './IconButton';
import { useState } from 'react';
import { updateNote } from '../actions';
import { FaRegWindowClose, FaRegCheckSquare } from 'react-icons/fa';

interface UpdateNoteFormProps {
  id: string;
  title: string;
  content: string;
  important?: boolean;
  onClose: () => void;
}

const UpdateNoteForm = ({
  id,
  title,
  content,
  important,
  onClose,
}: UpdateNoteFormProps) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = () => setIsDisabled(false);

  const handleSubmit = updateNote.bind(null, id);

  return (
    <form action={handleSubmit} onSubmit={onClose} className='space-y-4'>
      <input
        placeholder='Meaningful title'
        type='text'
        name='title'
        className='bg-theme-editing w-full p-2 caret-[bg-theme-primary] focus:outline-none'
        onChange={handleChange}
        defaultValue={title}
      />
      <textarea
        placeholder='Important thoughts'
        name='content'
        className='bg-theme-editing w-full p-2 caret-[bg-theme-primary] focus:outline-none'
        onChange={handleChange}
        defaultValue={content}
      />
      <div className='flex items-center space-x-1'>
        <input
          type='checkbox'
          name='important'
          className='accent-theme-primary cursor-pointer'
          defaultChecked={important}
          onChange={handleChange}
        />
        <label className='text-sm'>Is it reeeaaaally important?</label>
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

export default UpdateNoteForm;
