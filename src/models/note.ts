export interface Note {
  id: string;
  title: string;
  content: string; // Encrypted content
  tags: string[];
  notebookId: string;
  createdAt: Date;
  updatedAt: Date;
}
