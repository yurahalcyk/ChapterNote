import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router';
import { useRegisterUserMutation } from '../../api-service/auth';
import { useState } from 'react';

export const RegisterForm = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser({ username, email, password });
  };

  return (
    <Card className="d-flex justify-content-center p-4">
      <h2 className="text-center m-0">Register</h2>
      <Form onSubmit={handleSubmit} className="d-flex flex-column">
        <Form.Group className="mt-2">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Choose a username"
            value={username}
            required
            onChange={e => {
              setUsername(e.target.value);
            }}
            data-testid="username-input"
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Type your email"
            value={email}
            required
            onChange={e => {
              setEmail(e.target.value);
            }}
            data-testid="email-input"
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
            data-testid="password-input"
          />
        </Form.Group>
        <Button
          type="submit"
          className="mt-4"
          disabled={isLoading}
          data-testid="register-btn"
        >
          REGISTER
        </Button>
      </Form>
      <div className="mt-4">
        <p>
          Already have an account? Please login <Link to="/login">here</Link>
        </p>
      </div>
    </Card>
  );
};
