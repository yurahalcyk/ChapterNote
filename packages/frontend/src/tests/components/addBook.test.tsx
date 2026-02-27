import { describe, expect, it } from '@jest/globals';
import { screen, waitFor } from '@testing-library/react';
import { renderComponentWithProviderAndToast, setupUser } from '../utils';
import { AddBook } from '../../features/books/addBook';

const bookTitle = 'test-book';
const bookAuthor = 'test-author';
const bookChapters = '10';

describe('Add Book Component', () => {
  it('title, author, chapters are required fields, and page isnt', async () => {
    const user = setupUser();
    renderComponentWithProviderAndToast(<AddBook />, ['/add-book']);

    const titleInput = screen.getByTestId('title-input');

    const requiredFields = [
      titleInput,
      screen.getByTestId('author-input'),
      screen.getByTestId('chapter-input'),
    ];

    const pageInput = screen.getByTestId('page-input');

    requiredFields.forEach(field => {
      expect(field).toBeRequired();
    });

    expect(pageInput).not.toBeRequired();

    const submitBtn = screen.getByTestId('submit-btn');
    await user.click(submitBtn);

    // prevents submit if required field empty
    await waitFor(() => {
      expect(titleInput).toBeInvalid();
    });
  });

  it('successful toast appears when book added and redirect to dashboard set', async () => {
    const user = setupUser();

    const { store } = renderComponentWithProviderAndToast(<AddBook />, [
      '/add-book',
    ]);

    await user.type(screen.getByTestId('title-input'), bookTitle);
    await user.type(screen.getByTestId('author-input'), bookAuthor);
    await user.type(screen.getByTestId('chapter-input'), bookChapters);
    await user.click(screen.getByTestId('submit-btn'));

    await waitFor(() => {
      expect(
        screen.getByText(`Added ${bookTitle} to your library!`),
      ).toBeInTheDocument();
    });

    const state = store.getState();
    expect(state.navigation.path).toBe('/dashboard');
  });
});
