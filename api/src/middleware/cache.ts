import { Request, Response, NextFunction } from 'express';

interface CacheItem {
  data: any;
  timestamp: number;
}

const TTL_IN_MIN = 5 * 60 * 1000;

const cache = new Map<string, CacheItem>();

export function cacheMiddleware(ttl: number = TTL_IN_MIN) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.originalUrl;

    const cached = cache.get(key);
    const now = Date.now();

    if (cached && now - cached.timestamp < ttl) {
      console.log('Used cache', key);

      return res.json(cached.data);
    }

    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      cache.set(key, { data: body.data || body, timestamp: now });
      return originalJson(body);
    };

    next();
  };
}
