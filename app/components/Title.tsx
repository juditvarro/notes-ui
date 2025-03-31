'use client';

import NewNote from "./NewNote";

const Title = () => {
  return (
    <div className='flex w-full justify-between'>
      <h1 className='bg-theme-primary engraved-text p-2 text-4xl font-bold md:p-4 md:text-5xl'>
        Unnoteworthy Notes
      </h1>
      <NewNote />
    </div>
  );
};

export default Title;
