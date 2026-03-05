export type Book = {
  id: string;
  title: string;
  author: string;
  chapters: number;
  pages: number | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};

export type AddBookRequest = {
  title: string;
  author: string;
  chapters: number;
  pages?: number;
};

export type GetBooksResponse = {
  message: string;
  count: number;
  books: Book[];
};
