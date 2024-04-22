import React, { useState } from "react";

import { createNote } from "@/services/note-service";

function NoteEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNote(title, content);
      // Reset form fields
      setTitle("");
      setContent("");

      alert("success!");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-prose">
        <form onSubmit={(event) => void handleSubmit(event)}>
          <div className="flex flex-col gap-5">
            <input
              type="text"
              value={title}
              className="rounded-md p-2 text-4xl font-semibold text-black outline-none placeholder:font-medium"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Note title"
            />
            <textarea
              className="rounded-md p-2 outline-none"
              rows={10}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              placeholder="Add a note..."
            ></textarea>
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex rounded-lg bg-black p-3 font-medium text-white "
              >
                Create Note
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteEditor;
