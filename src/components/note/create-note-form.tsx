import React, { useState } from "react";
import { createNote } from "@/services/note-service";

function CreateNoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create a new note using the title and content
      await createNote(title, content);
      // Reset form fields
      setTitle("");
      setContent("");
      // Optionally, display a success message or navigate to another page
      alert("success!");
    } catch (error) {
      console.error("Error creating note:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder="Content"
      ></textarea>
      <button type="submit">Create Note</button>
    </form>
  );
}

export default CreateNoteForm;
