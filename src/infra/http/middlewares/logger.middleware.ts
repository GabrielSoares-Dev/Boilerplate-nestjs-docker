import { Injectable, Inject, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {
  LOGGER_SERVICE_TOKEN,
  LoggerServiceInterface,
} from '@application/services/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(LOGGER_SERVICE_TOKEN)
    private readonly loggerService: LoggerServiceInterface,
  ) {}

  private responseLog(res: Response) {
    let bodyResponse: string;
    const chunks = [];
    const oldEnd = res.end;
    res.end = (chunk) => {
      if (chunk) {
        chunks.push(Buffer.from(chunk));
      }
      bodyResponse = Buffer.concat(chunks).toString('utf8');
      return oldEnd.call(res, bodyResponse);
    };

    res.on('finish', async () => {
      return setTimeout(() => {
        this.loggerService.debug('response', JSON.parse(bodyResponse));
      }, 0);
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const path = req.originalUrl;
    const body = req.body;
    const headers = req.headers;
    this.loggerService.info('path', path);
    this.loggerService.debug('request', body);
    this.loggerService.debug('headers', headers);

    this.responseLog(res);

    next();
  }
}
