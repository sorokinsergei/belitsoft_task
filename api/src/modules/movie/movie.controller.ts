import { Request, Response } from 'express';

import movieService from './movie.service';

export default {
  search: async (req: Request, res: Response) => {
    try {
      const { q } = req.query as unknown as { q: string };

      const profession = await movieService.searchMovies(q);

      res.json({ profession });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
