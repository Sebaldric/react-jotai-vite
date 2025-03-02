import { useAtomValue, useSetAtom } from "jotai";
import { savedNotesAtom, selectedNoteAtom } from "../store";
import {
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  headingsPlugin,
  imagePlugin,
  InsertCodeBlock,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
const plugins = [
  headingsPlugin(),
  listsPlugin(),
  markdownShortcutPlugin(),
  linkPlugin(),
  imagePlugin(),
  codeBlockPlugin({
    defaultCodeBlockLanguage: "js",
  }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: "javascript",
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      css: "css",
      html: "html",
      json: "json",
      python: "python",
      ruby: "ruby",
    },
  }),
  toolbarPlugin({
    toolbarContents: () => {
      return (
        <>
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <BoldItalicUnderlineToggles />
            </div>
            <div className="flex gap-1">
              <ListsToggle />
            </div>
            <div className="flex gap-1">
              <InsertCodeBlock />
            </div>
          </div>
        </>
      );
    },
  }),
];

function Editor() {
  const selectedNote = useAtomValue(selectedNoteAtom);
  const updateNote = useMutation(api.notes.updateNote);
  const savedNotes = useSetAtom(savedNotesAtom);
  const [content, setContent] = useState(selectedNote?.content || "");

  const debouncedContent = useDebounce(content, 1000);

  useEffect(() => {
    if (!debouncedContent || !selectedNote) return;
    updateNote({
      noteId: selectedNote.id,
      title: selectedNote.title,
      content: debouncedContent,
    });
  }, [debouncedContent]);

  const handleContentChange = useCallback(
    (newContent: string) => {
      setContent(newContent);
      savedNotes(newContent);
    },
    [savedNotes]
  );

  return (
    <div className="flex-1">
      {selectedNote ? (
        <MDXEditor
          key={selectedNote.id}
          markdown={selectedNote.content}
          plugins={plugins}
          contentEditableClassName="prose max-w-none focus:outline-none"
          className="h-full"
          placeholder="Write something..."
          onChange={handleContentChange}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Select a note to get started</p>
        </div>
      )}
    </div>
  );
}

export default Editor;
