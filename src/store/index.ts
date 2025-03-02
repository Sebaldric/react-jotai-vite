import { atom } from "jotai";
import { Note } from "../domain/note";
import { Id } from "../../convex/_generated/dataModel";

export const notesAtom = atom<Note[]>([]);
export const selectedNoteIdAtom = atom<Id<"notes"> | null>(null);

export const selectedNoteAtom = atom((get) => {
  const notes = get(notesAtom);
  const id = get(selectedNoteIdAtom);
  if (!id) return null;
  return notes.find((note) => note.id === id);
});

export const savedNotesAtom = atom(null, (get, set, newContent: string) => {
  const note = get(selectedNoteAtom);
  if (!note) return;

  const updateNote = new Note(note.id, note.title, newContent, Date.now());
  const notes = get(notesAtom);
  const updatedNotes = notes.map((n) => (n.id === note.id ? updateNote : n));
  set(notesAtom, updatedNotes);
});
