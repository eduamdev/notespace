import React, { useState } from "react";
import Layout from "@/components/layout/layout";
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
    <Layout>
      <form onSubmit={(event) => void handleSubmit(event)}>
        <div className="flex flex-col gap-2">
          <h1 className="py-3 text-xl font-semibold">New note</h1>
          <input
            type="text"
            value={title}
            className="border p-2"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title"
          />
          <textarea
            className="border p-2"
            rows={10}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="Content"
          ></textarea>
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex bg-black p-3 font-medium text-white"
            >
              Create Note
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}

export default NoteEditor;
