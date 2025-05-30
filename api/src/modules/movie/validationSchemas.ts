import { z } from 'zod';

const MAX_LENGTH = 100;

export const SearchMoviesValidationSchema = {
  query: z.object({
    q: z.string().nonempty().max(MAX_LENGTH),
  }),
};
