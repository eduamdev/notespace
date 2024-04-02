function NewPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-none px-5 sm:max-w-[90%] sm:px-0">
        <h1 className="pt-6 text-2xl font-semibold">NoteGuard</h1>
        <div className="pt-12">
          <div className="flex items-center justify-between gap-x-4">
            <input className="border p-2" placeholder="title"></input>
            <button>Save</button>
          </div>
          <div className="mt-4">
            <textarea
              className="size-full border p-2"
              rows={10}
              placeholder="content"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPage;
