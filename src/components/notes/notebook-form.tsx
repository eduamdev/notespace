import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ModalForm from "@/components/modal-form";
import { PlusIcon } from "@/components/icons/plus-icon";
import { generateUniqueId } from "@/lib/utils";
import { Notebook } from "@/models/notebook";

interface NotebookFormProps {
  createItem: (notebook: Notebook) => void;
}

export default function NotebookForm({ createItem }: NotebookFormProps) {
  const [notebookName, setNotebookName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      if (notebookName.trim()) {
        createItem({
          id: generateUniqueId(),
          name: notebookName,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as Notebook);

        setNotebookName("");
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error("Error saving notebook");
      console.error("Error saving notebook:", error);
    }
  };

  return (
    <ModalForm
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      title="Create Notebook"
      description=""
      trigger={
        <Button>
          <PlusIcon className="mr-2 size-[18px] shrink-0" /> New Notebook
        </Button>
      }
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label htmlFor="notebookNameInput" className="sr-only">
          Notebook Name:
        </label>
        <input
          type="text"
          id="notebookNameInput"
          value={notebookName}
          placeholder="Enter notebook name"
          className="h-10 w-full rounded-md border border-black/[0.12] px-3 shadow-sm outline-none placeholder:text-sm"
          onChange={(e) => {
            setNotebookName(e.target.value);
          }}
        />
      </div>
    </ModalForm>
  );
}
