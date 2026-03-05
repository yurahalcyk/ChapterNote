import { Card, Container } from 'react-bootstrap';
import { useGetBooksQuery } from '../../books/api-service/book-api';
import { BookCollection } from './book-collection';

// Dashboard
// - fetch all users books + notes (to be implemented)
// - books = pass array of books to book collection component (responsible for implementing carousel component)
// - !books = display no books alert

export const Dashboard = () => {
  const books = useGetBooksQuery();
  const bookData = books.data;

  return (
    <Container>
      <div className="mt-4 p-2">
        <h1 className="fs-2 text-white">My books ({bookData?.count})</h1>
        {!bookData ? (
          <h3>
            ! You have no books in your library. Add a book for them to be
            displayed here.
          </h3>
        ) : (
          <BookCollection bookArray={bookData.books} />
        )}
      </div>
      <div className="mt-4 p-2">
        <h1 className="fs-2 text-white">My recent notes</h1>
        <Card>
          <p>recent notes</p>
        </Card>
      </div>
    </Container>
  );
};
