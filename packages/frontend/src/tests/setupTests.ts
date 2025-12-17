import { server } from './mocks/node.ts';
import { afterAll, afterEach, beforeAll } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import 'cross-fetch/polyfill';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
