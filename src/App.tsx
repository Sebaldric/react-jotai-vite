import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { Note } from "./domain/note";
import { notesAtom } from "./store";
import SideMenu from "./components/SideMenu";
import Editor from "./components/Editor";

function App() {
  const setNotes = useSetAtom(notesAtom);

  useEffect(() => {
    const noteData = [
      new Note("1", "Note 1", "content1", new Date().getTime()),
      new Note("2", "Note 2", "content2", new Date().getTime()),
      new Note("3", "Note 3", "content3", new Date().getTime()),
    ];
    setNotes(noteData);
  }, []);

  return (
    <div className="flex h-screen w-full bg-white">
      <SideMenu />
      <Editor />
    </div>
  );
}

export default App;
