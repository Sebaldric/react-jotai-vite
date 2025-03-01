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
