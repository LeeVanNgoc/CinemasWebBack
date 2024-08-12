import express, { Application, Request, Response } from "express";
import { Next } from "mysql2/typings/mysql/lib/parsers/typeCast";
import dotenv from "dotenv";

import { connectDB } from "./config/connectDB";

import notFoundHandler from "./middlewares/notFoundHandler";
import errorHandler from "./middlewares/errorHandler";

import movieRoutes from "./routes/movieRoutes";
import genreRoutes from "./routes/genreRoutes";
import postsRoutes from "./routes/postsRoutes";
import promotionRoutes from "./routes/promotionRoutes";
import roomRoutes from "./routes/roomRoutes";
import planScreenMovieRoutes from "./routes/planScreenMovieRoutes";
import movieGenreRoutes from "./routes/movieGenreRoutes";

import userRoutes from "./routes/userRoutes";
import ticketRoutes from "./routes/ticketsRouter";
import trailerRoutes from "./routes/trailerRouter";
import theaterRoutes from "./routes/theaterRouter";
import seatRouter from "./routes/seatsRouter";
import seatTicketRouter from "./routes/seatTicketRouter";
import priceRouter from "./routes/priceRouter";
import bookedSeatRouter from "./routes/bookedSeatRoutes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 7060;
const urlReact = process.env.URLREACT ? process.env.URLREACT : "localhost";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use((req: Request, res: Response, next: Next) => {
  res.setHeader("Access-Control-Allow-Origin", urlReact);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Routes
userRoutes(app);
movieRoutes(app);
genreRoutes(app);
postsRoutes(app);
promotionRoutes(app);
roomRoutes(app);
planScreenMovieRoutes(app);
movieGenreRoutes(app);

userRoutes(app);
ticketRoutes(app);
trailerRoutes(app);
theaterRoutes(app);
seatRouter(app);
seatTicketRouter(app);
priceRouter(app);
bookedSeatRouter(app);

// Error handling middleware
app.use(errorHandler);
app.use(notFoundHandler);

// Connect to database and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
