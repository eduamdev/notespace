export interface Note {
  id: string;
  title: string;
  contentHTML: string;
  contentText: string;
  tags: string[];
  notebookId: string;
  createdAt: Date;
  updatedAt: Date;
}
