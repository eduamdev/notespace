import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { generateUniqueId } from "@/lib/utils";
import { useNotebooks } from "@/hooks/use-notebooks";

interface NotebookFormProps {
  onSuccess?: () => void;
}

export default function NotebookForm({ onSuccess }: NotebookFormProps) {
  const { createItem: createNotebook } = useNotebooks();
  const [notebookName, setNotebookName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      if (notebookName.trim()) {
        createNotebook({
          id: generateUniqueId(),
          name: notebookName,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        setNotebookName("");
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      toast.error("Error saving notebook");
      console.error("Error saving notebook:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="notebookNameInput" className="sr-only">
          Notebook Name:
        </label>
        <input
          type="text"
          id="notebookNameInput"
          value={notebookName}
          placeholder="Enter notebook name"
          className="h-[38px] w-full rounded-md border border-black/[0.12] px-3 shadow-sm outline-none placeholder:text-sm"
          onChange={(e) => {
            setNotebookName(e.target.value);
          }}
        />
      </div>
      <div className="mt-auto flex flex-col items-center gap-2 py-4 lg:flex-row lg:justify-end lg:pb-0">
        <Button type="submit" className="w-full lg:w-auto">
          Create Notebook
        </Button>
      </div>
    </form>
  );
}
