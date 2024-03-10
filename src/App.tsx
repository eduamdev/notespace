function App() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-none px-5 sm:max-w-[90%] sm:px-0">
        <h1 className="pt-6 text-2xl font-semibold">NoteGuard</h1>
        {/* actions */}
        <div className="flex flex-row gap-6 pt-12">
          <button>Add note</button>
          <button>Add folder</button>
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

export default App;
