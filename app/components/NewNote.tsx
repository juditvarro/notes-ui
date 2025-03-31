'use client';

import { useState } from 'react';
import NewNoteButton from './NewNoteButton';
import NewNoteModal from './NewNoteModal';
import NewNoteForm from './NewNoteForm';

const NewNote = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleNewNoteClick = () => {
    setModalOpen(true);
  };

  const handleModalOnclose = () => {
    setModalOpen(false);
  };

  return (
    <div className='flex justify-end'>
      <NewNoteButton onClick={handleNewNoteClick} />
      <NewNoteModal isOpen={modalOpen} onClose={handleModalOnclose}>
        <NewNoteForm onClose={() => setModalOpen(false)} />
      </NewNoteModal>
    </div>
  );
};

export default NewNote;
