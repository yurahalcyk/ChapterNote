export type BookDetails = {
  title: string;
  author: string;
  chapters: number;
  pages?: number;
};

export type UpdatedBookDetails = Partial<BookDetails> & { id: string };
