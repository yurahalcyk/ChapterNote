import { handlers as authHandlers } from './auth-handlers';
import { handlers as bookHandlers } from './book-handlers';

export const handlers = [...authHandlers, ...bookHandlers];
