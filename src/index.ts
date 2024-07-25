import express, { Application, Request, Response } from 'express';
import { Next } from 'mysql2/typings/mysql/lib/parsers/typeCast';
import dotenv from 'dotenv';

import { connectDB } from './config/connectDB';

import userRoutes from './routes/userRoutes';
import movieRoutes from './routes/movieRoutes';
import genreRoutes from './routes/genreRoutes';
import newsRoutes from './routes/newsRoutes';
import ticketRoutes from './routes/ticketsRouter';
import errorHandler from './middlewares/errorHandler';
import trailerRoutes from './routes/trailerRouter';
import theaterRoutes from './routes/theaterRouter';
import seatRouter from './routes/seatsRouter';
import seatTicketRouter from './routes/seatTicketRouter';
import priceRouter from './routes/priceRouter';

dotenv.config();

const app: Application = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 7060;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use((req: Request, res: Response, next: Next ) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5050');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.options('*', (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:6060');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Routes
userRoutes(app);
movieRoutes(app);
genreRoutes(app);
newsRoutes(app);
ticketRoutes(app);
trailerRoutes(app);
theaterRoutes(app);
seatRouter(app);
seatTicketRouter(app);
priceRouter(app);

// Error handling middleware
app.use(errorHandler);

// Connect to database and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
