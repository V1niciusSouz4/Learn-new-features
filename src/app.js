import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { errorHandler, notFound, logMiddleware } from './middlewares/index.js';
import routes from './routes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(logMiddleware);

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
