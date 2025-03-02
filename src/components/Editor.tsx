import { useAtomValue } from "jotai";
import { selectedNoteAtom } from "../store";
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
