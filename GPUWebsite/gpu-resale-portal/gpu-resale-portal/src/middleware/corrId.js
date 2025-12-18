import { randomUUID } from 'crypto';

export function withCorrId(req, res, next) {
  req.corrId = req.headers['x-corr-id'] || randomUUID();
  res.setHeader('x-corr-id', req.corrId);
  next();
}

