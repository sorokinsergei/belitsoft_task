import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export type ValidationSchemas = {
  query?: ZodSchema;
  params?: ZodSchema;
  body?: ZodSchema;
};

function validate(
  field: 'query' | 'params' | 'body',
  schemas: ValidationSchemas,
  req: Request,
  res: Response,
) {
  const result = schemas[field]?.safeParse(req[field]);

  if (!result?.success) {
    res.status(400).json(result?.error);

    return;
  }

  req[field] = result.data;
}

export const validateRequest = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.query) {
        validate('query', schemas, req, res);
      }

      if (schemas.params) {
        validate('params', schemas, req, res);
      }

      if (schemas.body) {
        validate('body', schemas, req, res);
      }

      next();
    } catch (err) {
      res.status(500).json({ error: 'Internal validation error', details: err });
    }
  };
};
