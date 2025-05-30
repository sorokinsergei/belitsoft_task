import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { globalErrorHandler } from './middleware/globalErrorHandler';
import { logging } from './middleware/logging';
import movieRoute from './modules/movie/movie.route';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(logging);

app.use('/movies', movieRoute);

app.use(globalErrorHandler);

export default app;
