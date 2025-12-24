export const validBook = {
  id: '001',
  title: 'test-book',
  author: 'test-author',
  chapters: 10,
  pages: 100,
  userId: 1,
  createdAt: new Date('2025-12-23T18:00:00.000Z'),
  updatedAt: new Date('2025-12-23T18:00:00.000Z'),
};

export const bookDetailsRequest = {
  title: 'test-book',
  author: 'test-author',
  chapters: 10,
  pages: 100,
};

export const createdBookResponse = {
  message: 'Book created successfully',
  book: { ...validBook },
};

export const collectionOfBooks = [
  { ...validBook },
  { ...validBook, id: '002' },
];
