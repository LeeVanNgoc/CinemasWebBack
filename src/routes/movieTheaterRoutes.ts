import express from "express";
import movieTheaterController from "../controllers/movieTheaterController";
import { Application } from "express-serve-static-core";

const router = express.Router();

const movieTheaterRoutes = (app: Application) => {
  router.post(
    "/create-new-movie-theater",
    movieTheaterController.handleCreateNewMovieTheater
  );
  router.delete(
    "/delete-movie-theater",
    movieTheaterController.handleDeleteMovieTheater
  );
  router.get(
    "/get-all-movie-theaters",
    movieTheaterController.handleGetAllMovieTheater
  );
  router.get(
    "/get-all-movie-from-theater",
    movieTheaterController.handleGetMovieFromTheater
  );

  return app.use("/api/movie-theaters", router);
};

export default movieTheaterRoutes;
