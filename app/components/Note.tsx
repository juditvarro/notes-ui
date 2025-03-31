'use client';
import { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import ImportantButton from './ImportantButton';
import IconButton from './IconButton';
import { deleteNote, NoteEntry, updateImportant } from '../actions';
import dayjs from 'dayjs';
import UpdateNoteForm from './UpdateNoteForm';

type NoteProps = {
  note: NoteEntry;
  important?: boolean;
};

const Note = ({ note, important }: NoteProps) => {
  const [isImportant, setIsImportant] = useState(important ?? false);
  const [isEditing, setIsEditing] = useState(false);

  const handleImportantUpdate = (important: boolean) => {
    updateImportant(note._id, important);
    setIsImportant(important);
  };

  return (
    <div className='bg-theme-note text-theme-primary rounded-md p-2 shadow-lg shadow-black md:p-4'>
      <div>
        {isEditing ? (
          <UpdateNoteForm
            onClose={() => setIsEditing(false)}
            id={note._id}
            title={note.title}
            content={note.content}
            important={note.important}
          />
        ) : (
          <>
            <div className='flex items-start justify-between gap-2 md:gap-4'>
              <div className='w-full'>
                <h3 className='text-xl md:text-2xl'>{note.title}</h3>
                <p className='pb-5 text-sm md:pb-6 md:text-base'>
                  Last updated:{' '}
                  {dayjs(note.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                </p>
                <p className='md:text-lg'>{note.content}</p>
              </div>
              <ImportantButton
                isImportant={isImportant}
                onClick={handleImportantUpdate}
              />
            </div>
            <div className='mt-4 flex justify-between'>
              <IconButton
                icon={<RiDeleteBin6Line size={20} />}
                onClick={() => deleteNote(note._id)}
                alert={true}
              />
              <IconButton
                icon={<FaRegEdit size={20} />}
                onClick={() => setIsEditing(true)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Note;
