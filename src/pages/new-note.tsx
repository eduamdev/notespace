import { encryptNote, generateKeyPair } from "@/services/crypto";
import localforage from "localforage";
import { SetStateAction, useState } from "react";

export interface Note {
  id: string;
  title: string;
  content: string;
}

function NewPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleTitleChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    setTitle(event.target.value);
  }

  function handleContentChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    setContent(event.target.value);
  }

  const handleClick = async () => {
    try {
      const { publicKey, privateKey } = await generateKeyPair();
      console.log("Public Key:", publicKey);

      if (!title || !content) return;

      const encryptedNote = await encryptNote(
        {
          title,
          content,
        },
        publicKey,
        privateKey
      );
      console.log("Encrypted Note:", encryptedNote);

      const notes = await localforage.getItem<Note[]>("notes");

      if (notes) {
        await localforage.setItem("notes", [...notes, encryptedNote]);
      } else {
        await localforage.setItem("notes", [encryptedNote]);
      }

      console.log(notes);

      alert("successfully something!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-none px-5 sm:max-w-[90%] sm:px-0">
        <h1 className="pt-6 text-2xl font-semibold">NoteGuard</h1>
        <div className="pt-12">
          <div className="flex items-center justify-between gap-x-4">
            <input
              className="border p-2"
              placeholder="title"
              value={title}
              onChange={handleTitleChange}
            ></input>
            <button type="submit" onClick={() => void handleClick()}>
              Save
            </button>
          </div>
          <div className="mt-4">
            <textarea
              className="size-full border p-2"
              rows={10}
              placeholder="content"
              value={content}
              onChange={handleContentChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPage;
