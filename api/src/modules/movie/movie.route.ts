import express from 'express';

import movieController from './movie.controller';
import { SearchMoviesValidationSchema } from './validationSchemas';
import { asyncHandler } from '../../middleware/asyncHeadler';
import { cacheMiddleware } from '../../middleware/cache';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();
router.get(
  '/search',
  validateRequest(SearchMoviesValidationSchema),
  cacheMiddleware(),
  asyncHandler(movieController.search),
);

export default router;
