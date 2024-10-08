import express from "express";
import movieGenreController from "../controllers/movieGenreController";
import { Application } from "express-serve-static-core";

const router = express.Router();

const movieGenreRoutes = (app: Application) => {
  router.post(
    "/create-new-movie-genre",
    movieGenreController.handleCreateMovieGenre
  );
  router.delete(
    "/delete-movie-genre",
    movieGenreController.handleDeleteMovieGenre
  );
  router.get(
    "/get-all-movie-genres",
    movieGenreController.handleGetAllMovieGenres
  );
  router.get(
    "/get-all-genres-for-movie",
    movieGenreController.handleGetGenresForMovie
  );

  return app.use("/api/movie-genres", router);
};

export default movieGenreRoutes;
