import { v4 as uuidv4 } from "uuid";

export const generateUniqueId = (): string => {
  //   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
  //     const r = (Math.random() * 16) | 0;
  //     const v = c === "x" ? r : (r & 0x3) | 0x8;
  //     return v.toString(16);
  //   });
  return uuidv4();
};
