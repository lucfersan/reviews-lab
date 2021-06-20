import { jwtConfig } from '@config/auth';
import { HttpException } from '@shared/errors/HttpException';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
};

export const ensureAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new HttpException('No token provided', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, jwtConfig.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new HttpException('Invalid Token', 401);
  }
};
