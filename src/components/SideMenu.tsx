import { useAtomValue } from "jotai";
import { notesAtom } from "../store";

function SideMenu() {
  const notes = useAtomValue(notesAtom);
  return (
    <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col">
      <div>
        <h2 className="">Notes</h2>
        <button className="">+</button>
      </div>
      <div className="">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-2 mb-2 rounded cursor-poninter flex justify-between items-center group"
          >
            <div className="flex-1 min-w-0">
              <input type="text" className="bg-gray-100" value={note.title} />
              <p>
                {note.lastEditTime
                  ? new Date(note.lastEditTime).toLocaleDateString()
                  : "Never edited"}
              </p>
            </div>
            <button>-</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideMenu;
