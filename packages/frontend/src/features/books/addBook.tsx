import { Button, Card, Container, Form } from 'react-bootstrap';
import { useAddBookMutation } from './api-service/book-api';
import { useReducer } from 'react';

type FormState = {
  title: string;
  author: string;
  chapters: number;
  pages?: number;
};

export const AddBook = () => {
  const initialState: FormState = {
    title: '',
    author: '',
    chapters: 0,
    pages: undefined,
  };

  // merge reducer pattern (similar to this.setState instead of using action types)
  const [state, updateState] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    initialState,
  );

  const [addBookTrigger, { isLoading }] = useAddBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBookTrigger(state);
  };

  return (
    <Container>
      <h1 className="mt-2">Add Book</h1>
      <Card className="d-flex justify-content-center p-4">
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Book Title"
              onChange={e => {
                updateState({ title: e.target.value });
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Book Author"
              onChange={e => {
                updateState({ author: e.target.value });
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Chapters</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Number of Chapters"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateState({ chapters: e.target.valueAsNumber });
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pages</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Number of Pages"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateState({ pages: e.target.valueAsNumber });
              }}
            />
          </Form.Group>
          <Button type="submit" disabled={isLoading}>
            Add Book
          </Button>
        </Form>
      </Card>
    </Container>
  );
};
