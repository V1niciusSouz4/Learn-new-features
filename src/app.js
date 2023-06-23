import 'dotenv/config';
import express, { json, urlencoded } from 'express';
// import helmet from 'helmet';
import cors from 'cors';

// import {} from './middlewares.index.js';
import routes from './routes.js';

const app = express();

// app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
// app.use();

app.use('/api/v1', routes);

export default app;
