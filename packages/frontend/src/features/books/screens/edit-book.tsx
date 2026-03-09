import { useParams } from 'react-router';
import { Card, Container, Form } from 'react-bootstrap';

export const EditBook = () => {
  const params = useParams();
  console.log(`params: ${JSON.stringify(params)}`);

  return (
    <Container>
      <div className="mt-4 p-2">
        <h1 className="fs-2 text-white">Edit Book</h1>
        <Card className="d-flex justify-content-center p-4">
          <Form className="d-flex flex-column">
            <Form.Group>
              <Form.Label>Current Title:</Form.Label>
            </Form.Group>
          </Form>
        </Card>
      </div>
    </Container>
  );
};
