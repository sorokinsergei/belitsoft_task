import { fetchWithTimeout } from '../utils/fetchWithTimeout';

const BASE_URL = 'http://api.tvmaze.com/search/shows?q=banana';

export default {
  searchMovies: async (search: string, timeout?: number) => {
    const url = new URL(BASE_URL);
    url.search = new URLSearchParams({ q: search }).toString();

    return await fetchWithTimeout(url, timeout);
  },
};
