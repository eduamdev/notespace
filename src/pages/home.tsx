import { useState } from "react";
import { Link } from "wouter";

function HomePage() {
  const [notes] = useState([
    {
      id: "noteeeeee1",
      title: "Note 1",
      content: "This is just a simple content for the note 1",
    },
    {
      id: "noteeeeee2",
      title: "Note 2",
      content:
        "This is just a another simple test content. This time, for note 2",
    },
  ]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-none px-5 sm:max-w-[90%] sm:px-0">
        <h1 className="pt-6 text-2xl font-semibold">NoteGuard</h1>
        {/* actions */}
        <div className="flex flex-row items-center gap-6 pt-12">
          <Link to="/note/new">Add note</Link>
          <button>Add folder</button>
        </div>
        <div className="my-4">
          <ul>
            {notes.map((note) => {
              return (
                <li key={note.title}>
                  <Link to={`/note/${note.id}`}>{note.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pt-6">
          <div className="flex items-center justify-between">
            <span>1. Folder 1</span>
            {/* actions */}
            <div className="flex flex-row items-center gap-x-5">
              <button>edit</button>
              <button>delete</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>2. Folder 2</span>
            {/* actions */}
            <div className="flex flex-row items-center gap-x-5">
              <button>edit</button>
              <button>delete</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>3. Folder 3</span>
            {/* actions */}
            <div className="flex flex-row items-center gap-x-5">
              <button>edit</button>
              <button>delete</button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>4. Folder 4</span>
            {/* actions */}
            <div className="flex flex-row items-center gap-x-5">
              <button>edit</button>
              <button>delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
