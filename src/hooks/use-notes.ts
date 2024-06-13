import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  initDB,
  addItem,
  updateItem,
  getAllItems,
  deleteItem,
} from "@/services/idb-service";
import { STORE_NAMES } from "@/lib/constants";
import { Note } from "@/models/note";

const addNote = async (note: Note) => {
  await initDB();
  await addItem(STORE_NAMES.NOTES, note);
};

const getNotes = async () => {
  await initDB();
  return await getAllItems<Note>(STORE_NAMES.NOTES);
};

const updateNote = async (note: Note) => {
  await initDB();
  await updateItem(STORE_NAMES.NOTES, note);
};

const deleteNote = async (id: string) => {
  await initDB();
  await deleteItem(STORE_NAMES.NOTES, id);
};

export const useNotes = () => {
  const queryClient = useQueryClient();

  const {
    data: notes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  const addNoteMutation = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  return {
    notes,
    error,
    isLoading,
    addNote: addNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
  };
};

// export const useNotes = () => {
//   const queryClient = useQueryClient();
//   return queryClient.getQueryData<Note[]>(["notes"]);
// };

// const createNote = async (data: Note) => {
//   console.log(data);

//   const note = {
//     ...data,
//     id: "42",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };

//   await initDB();
//   await addItem(STORE_NAMES.NOTES, note);

//   // const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   //   body: JSON.stringify(note),
//   // });

//   // console.log(response);

//   // return note;
// };

// export const useCreateNote = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createNote,
//     onMutate: async (newNote) => {
//       await queryClient.cancelQueries({
//         queryKey: ["notes"],
//       });

//       const previousNotes: Note[] | undefined = queryClient.getQueryData([
//         "notes",
//       ]);

//       await queryClient.setQueryData(["notes"], (prevNotes?: Note[]) => {
//         if (!prevNotes) {
//           return [newNote];
//         }

//         return [...prevNotes, newNote];
//       });

//       return { previousNotes };
//     },
//     onError: (error, _variables, context) => {
//       console.error(error);

//       if (context?.previousNotes) {
//         queryClient.setQueryData(["notes"], context.previousNotes);
//       }
//     },
//     onSettled: async () => {
//       await queryClient.invalidateQueries({
//         queryKey: ["notes"],
//       });
//     },
//     // onSuccess: async (note: Note) => {
//     //   await initDB();
//     //   await addItem(STORE_NAMES.NOTES, note);
//     //   queryClient.setQueryData(["notes"], note);
//     // },
//   });
// };
