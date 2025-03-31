import { listNotes } from './actions';
import NoteList from './components/NoteList';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const notes = await listNotes();

  return (
    <div className='bg-theme-primary min-h-screen space-y-10 p-6 md:p-10'>
      {notes && <NoteList notes={notes} />}
    </div>
  );
}
