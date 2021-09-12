import express from 'express';

import { system, api } from './routes';
import morganMiddleware from './middlewares/morgan-middleware';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(morganMiddleware);

app.use('/api', api);
app.use('/system', system);

app.use(errorHandler);

export default app;
