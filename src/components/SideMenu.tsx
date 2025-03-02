import { useAtom, useSetAtom } from "jotai";
import { notesAtom, selectedNoteIdAtom } from "../store";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Note } from "../domain/note";
import { Id } from "../../convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

function SideMenu() {
  const [notes, setNotes] = useAtom(notesAtom);
  const setSelectedNoteId = useSetAtom(selectedNoteIdAtom);

  const createNote = useMutation(api.notes.create);

  const handleCreateNote = async () => {
    const noteId = await createNote({
      title: "Untitled",
      content: "",
    });
    const newNote = new Note(noteId, "Untitled", "", Date.now());
    setNotes([...notes, newNote]);
  };

  const deleteNote = useMutation(api.notes.deleteNote);
  const updateNote = useMutation(api.notes.updateNote);
  const [editingNote, setEditingNote] = useState<{
    id: Id<"notes">;
    title: string;
  } | null>(null);

  const handleDeleteNote = async (noteId: Id<"notes">) => {
    await deleteNote({ id: noteId });
    setNotes(notes.filter((n) => n.id !== noteId));
  };

  const handleNoteClick = (noteId: Id<"notes">) => {
    setSelectedNoteId(noteId);
  };

  const debounceTitle = useDebounce(editingNote?.title, 500);

  useEffect(() => {
    if (debounceTitle && editingNote) {
      handleUpdateTitle(editingNote.id, debounceTitle);
    }
  }, [debounceTitle]);

  const handleTitleChange = async (noteId: Id<"notes">, title: string) => {
    setEditingNote({ id: noteId, title });
    setNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, title } : n))
    );
  };

  const handleUpdateTitle = async (noteId: Id<"notes">, newTitle: string) => {
    const note = notes.find((n) => n.id === noteId);
    if (note) {
      await updateNote({ noteId, title: newTitle, content: note.content });
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col">
      <div>
        <h2 className="">Notes</h2>
        <button onClick={handleCreateNote} className="">
          +
        </button>
      </div>
      <div className="">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-2 mb-2 rounded cursor-poninter flex justify-between items-center group"
            onClick={() => handleNoteClick(note.id)}
          >
            <div className="flex-1 min-w-0">
              <input
                type="text"
                className="bg-gray-100"
                onChange={(e) => handleTitleChange(note.id, e.target.value)}
                value={note.title}
              />
              <p>
                {note.lastEditTime
                  ? new Date(note.lastEditTime).toLocaleString()
                  : "Never edited"}
              </p>
            </div>
            <button onClick={() => handleDeleteNote(note.id)}>-</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideMenu;
