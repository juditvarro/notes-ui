'use client';

import { NoteEntry } from '../actions';
import Note from './Note';

interface NoteListProps {
  notes: NoteEntry[];
}

const NoteList = ({ notes }: NoteListProps) => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8'>
      {notes.map((note) => (
        <div key={note._id}>
          <Note note={note} important={note.important} />
        </div>
      ))}
    </div>
  );
};

export default NoteList;
