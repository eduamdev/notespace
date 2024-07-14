import { v4 as uuidv4 } from "uuid";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const generateUniqueId = (): string => {
  return uuidv4();
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
