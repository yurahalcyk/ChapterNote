import { Card } from 'react-bootstrap';
import { Book } from '../types';
import { Link } from 'react-router';

// Book Card
// - component to display book information within a card

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
  // const hasUpdated: boolean =
  //   book.createdAt.toString() !== book.updatedAt.toString();

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
        {/* {hasUpdated && (
          <Card.Subtitle className="mb-2">
            Updated: {new Date(book.updatedAt).toLocaleDateString()}
          </Card.Subtitle>
        )} */}
      </div>
      <Card.Footer className="text-center">Add Note</Card.Footer>
      <Card.Footer className="text-center">
        <Link to={`/edit-book/${book.title}/${book.id}`}>Edit Book</Link>
      </Card.Footer>
    </Card>
  );
};
