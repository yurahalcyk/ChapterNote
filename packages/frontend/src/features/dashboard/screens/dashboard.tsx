import { Card, Container } from 'react-bootstrap';

export const Dashboard = () => {
  return (
    <Container>
      <div className="mt-4 p-2">
        <h1 className="fs-2 text-white">My books</h1>
        <Card>
          <p>collection of books</p>
        </Card>
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
