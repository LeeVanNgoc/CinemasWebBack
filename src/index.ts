import express, { Application, Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';
import { Next } from 'mysql2/typings/mysql/lib/parsers/typeCast';

import userRoutes from './routes/userRoutes';
import movieRoutes from './routes/movieRoutes';
import genreRoutes from './routes/genreRoutes';
import newsRoutes from './routes/newsRoutes';

import errorHandler from './middleware/errorHandler';


dotenv.config();

const app: Application = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5050;

app.use(function (req: Request, res: Response, next: Next) {
  // Website you wish to allow to connect   
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5050');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Pass to next layer of middleware
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

userRoutes(app);
movieRoutes(app);
genreRoutes(app);
newsRoutes(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
