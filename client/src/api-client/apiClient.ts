import { apiRoutes } from './apiRoutes';
import type { MoviesSearch } from './interfaces';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  query?: Record<string, string>;
}

async function apiRequest<T>(
  endpoint: string,
  { method = 'GET', headers = {}, body, query }: RequestOptions = {},
): Promise<T> {
  const url = new URL(endpoint);
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  if (query) {
    url.search = new URLSearchParams(query).toString();
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}`);
  }

  return response.json();
}

export const apiClient = {
  movies: {
    search: (q: string) =>
      apiRequest<MoviesSearch>(apiRoutes.search, { method: 'GET', query: { q } }),
    // add other methods here
  },
};
