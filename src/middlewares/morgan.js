import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import { __dirname } from '../utils/index.js';

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '..', 'logs', 'access.log'),
  {
    flags: 'a',
  }
);

//Define quais logs precisarão puxar tbm o body de envio
morgan.token('req-body', req => {
  return req.method === 'POST' || req.method === 'PUT'
    ? JSON.stringify(req.body)
    : '';
});

const customFormatLog =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :req-body';

export const logMiddleware = morgan(customFormatLog, {
  stream: accessLogStream,
});
