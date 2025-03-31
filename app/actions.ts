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

async function fetchWithRevalidation(
  url: string,
  method: string,
  body?: string,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  revalidateTag('notes');
  return res.json();
}

async function performAction<T>(fn: () => Promise<T>): Promise<T | undefined> {
  try {
    return await fn();
  } catch (err) {
    console.error('Error during operation:', err);
    return undefined;
  }
}

function parseFormToBody(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  const important = formData.has('important');

  return JSON.stringify({ title, content, important });
}

export async function listNotes() {
  return performAction(async () => {
    const url = getUrl();
    const res = await fetch(url, { next: { tags: ['notes'] } });
    if (!res.ok) {
      console.log(`Failed to fetch notes. Status: ${res.status}`);
      return [];
    }
    const notes = (await res.json()) as NoteEntry[];
    return notes;
  });
}

export async function addNote(formData: FormData) {
  const url = getUrl();
  const body = parseFormToBody(formData);

  await performAction(() => fetchWithRevalidation(url, 'POST', body));
}

export async function updateNote(id: string, formData: FormData) {
  const url = getUrl();
  const body = parseFormToBody(formData);

  await performAction(() => fetchWithRevalidation(`${url}/${id}`, 'PUT', body));
}

export async function updateImportant(id: string, important: boolean) {
  const url = getUrl();

  await performAction(() =>
    fetchWithRevalidation(`${url}/${id}`, 'PUT', JSON.stringify({ important })),
  );
}

export async function deleteNote(id: string) {
  const url = getUrl();

  await performAction(() => fetchWithRevalidation(`${url}/${id}`, 'DELETE'));
}
