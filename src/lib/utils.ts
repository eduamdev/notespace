import { v4 as uuidv4 } from "uuid";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Note } from "@/models/note";

export const generateUniqueId = (): string => {
  return uuidv4();
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sortNotesByUpdatedAtDescending = (a: Note, b: Note) =>
  b.updatedAt.getTime() - a.updatedAt.getTime();
