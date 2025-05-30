import { Request, Response, NextFunction } from 'express';

const colours = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  default: '\x1b[0m',
};

export const logging = (req: Request, res: Response, next: NextFunction) => {
  const start = new Date().getTime();

  res.on('finish', () => {
    const end = new Date().getTime();
    const responseTimeMs = end - start;

    let colorStart = colours.green;

    if (res.statusCode >= 400 && res.statusCode < 500) {
      colorStart = colours.yellow;
    } else if (res.statusCode >= 500) {
      colorStart = colours.red;
    }
    const colorEnd = colours.default;

    const message = `${req.method} ${req.originalUrl} ${res.statusCode} - ${responseTimeMs} ms`;

    console.log(`${colorStart}${message}${colorEnd}`);
  });

  next();
};
