import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const extractApiError = (
  error: FetchBaseQueryError | undefined,
): string => {
  if (!error) return 'Unknown Error';
  const data = error.data;
  if (!data) return 'Network Error';
  if (typeof data === 'object') {
    const obj = data as Record<string, string>;
    return obj.message || obj.error;
  }
  return 'Unknown Error';
};
