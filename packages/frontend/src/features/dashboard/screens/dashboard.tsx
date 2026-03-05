import { Card, Container } from 'react-bootstrap';
import { useGetBooksQuery } from '../../books/api-service/book-api';
import { BookCollection } from './book-collection';

export const Dashboard = () => {
  const books = useGetBooksQuery();
  console.log(books.data);

  return (
    <Container>
      <div className="mt-4 p-2">
        <h1 className="fs-2 text-white">My books</h1>
        {!books.data ? (
          <h3>
            ! You have no books in your library. Add a book for them to be
            displayed here.
          </h3>
        ) : (
          <BookCollection bookArray={books.data.books} />
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
