'use server';

import { revalidateTag } from 'next/cache';

export interface NoteEntry {
  _id: string;
  sessionId: string;
  updatedAt: string;
  title: string;
  content: string;
  important?: boolean;
  __v: number;
}

function getUrl() {
  const url = process.env.NEXT_PUBLIC_API_URL;

  if (!url) {
    throw new Error('Cannot fetch notes: API is not configured');
  }

  return url;
}

async function performFetch(url: string, method: string, body?: string) {
  await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  revalidateTag('notes');
}

function parseFormToBody(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  const important = formData.get('important') ? true : false;

  return JSON.stringify({ title, content, important });
}

export async function listNotes() {
  try {
    const url = getUrl();
    const res = await fetch(url, { next: { tags: ['notes'] } });
    if (!res.ok) {
      console.log(res.status)
      return [];
    }
    const notes = (await res.json()) as NoteEntry[];
    return notes;
  } catch (err) {
    console.error(err);
    return;
  }
}

export async function addNote(formData: FormData) {
  try {
    const url = getUrl();
    const body = parseFormToBody(formData);

    await performFetch(url, 'POST', body);
  } catch (err) {
    console.log(err);
  }
}

export async function updateNote(id: string, formData: FormData) {
  try {
    const url = getUrl();
    const body = parseFormToBody(formData);

    await performFetch(`${url}/${id}`, 'PUT', body);
  } catch (err) {
    console.error(err);
  }
}

export async function updateImportant(id: string, important: boolean) {
  try {
    const url = getUrl();

    await performFetch(`${url}/${id}`, 'PUT', JSON.stringify({ important }));
  } catch (err) {
    console.error(err);
  }
}

export async function deleteNote(id: string) {
  try {
    const url = getUrl();

    await performFetch(`${url}/${id}`, 'DELETE');
  } catch (err) {
    console.error(err);
  }
}
