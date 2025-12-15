import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router';
import { useLoginUserMutation } from '../../api-service/auth';
import { useState } from 'react';

export const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginTrigger, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginTrigger({ username, password });
  };

  return (
    <>
      <Card className="d-flex justify-content-center p-4">
        <h2 className="text-center m-0">Login</h2>
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Form.Group className="mt-2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type your username"
              value={username}
              required
              onChange={e => {
                setUsername(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Type your password"
              value={password}
              required
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button className="mt-4" disabled={isLoading} type="submit">
            {isLoading ? 'Logging in...' : 'LOGIN'}
          </Button>
        </Form>
        <div className="mt-4">
          <p>
            Not registered yet? Please register <Link to="/register">here</Link>
          </p>
        </div>
      </Card>
    </>
  );
};
