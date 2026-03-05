import { Card } from 'react-bootstrap';
import { Book } from './types';

type BookCardProps = {
  book: Book;
};

const toTitleCase = (text: string) => {
  return text.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
};

export const BookCard = ({ book }: BookCardProps) => {
  const hasUpdated: boolean =
    book.createdAt.toString() !== book.updatedAt.toString();

  return (
    <Card style={{ width: '18rem' }}>
      <div className="p-2">
        <Card.Title className="mb-4">{toTitleCase(book.title)}</Card.Title>
        <Card.Subtitle className="mb-2">Author: {book.author}</Card.Subtitle>
        <Card.Subtitle className="mb-2">
          Chapters: {book.chapters}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2">
          Pages: {book.pages ? book.pages : '-'}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2">
          Created: {new Date(book.createdAt).toLocaleDateString()}
        </Card.Subtitle>
        {hasUpdated && (
          <Card.Subtitle className="mb-2">
            Updated: {new Date(book.updatedAt).toLocaleDateString()}
          </Card.Subtitle>
        )}
      </div>
      <Card.Footer className="text-center">Add Note</Card.Footer>
    </Card>
  );
};
