export interface Document {
  _id: string;
  _rev?: string;
  type: string;
  data: Uint8Array;
}

export interface Notebook {
  id: string;
  name: string;
  folders: Folder[];
  notes: Note[];
}

export interface Tag {
  id: string;
  name: string;
  notes: Note[];
}

export interface Folder {
  id: string;
  name: string;
  notes: Note[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
}
