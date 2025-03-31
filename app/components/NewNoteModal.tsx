'use client';

import { useEffect, useRef } from 'react';

interface NewNoteModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const NewNoteModal = ({ children, isOpen, onClose }: NewNoteModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        event.target instanceof Node &&
        !modalRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed text-theme-primary inset-0 z-50 flex items-center justify-center bg-gray-500/75'>
      <div className='mx-6'>
        <div
          ref={modalRef}
          className='bg-theme-editing rounded-lg p-6 shadow-xl md:p-8'
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default NewNoteModal;
