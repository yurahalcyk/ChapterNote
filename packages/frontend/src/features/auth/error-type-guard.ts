export const isErrorWithMessage = (
  error: unknown,
): error is { data: { error: string }; status: number } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof error.data === 'object' &&
    'error' in error.data!
  );
};
