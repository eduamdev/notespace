export interface Note {
  id: string;
  title: string;
  contentHTML: string;
  contentText: string;
  isFavorite: boolean;
  tags: string[];
  notebookId: string;
  createdAt: Date;
  updatedAt: Date;
}
