import express from "express";
import movieController from "../controllers/movieController";
import { Application } from "express-serve-static-core";

const router = express.Router();

const movieRoutes = (app: Application) => {
  router.post("/create-new-movie", movieController.handleCreateMovie);
  router.delete("/delete-movie", movieController.handleDeleteMovie);
  router.put("/edit-movie", movieController.handleEditMovie);
  router.get("/get-all-movies", movieController.handleGetAllMovies);
  router.get("/get-movie-by-code", movieController.handleGetMovieByCode);
  router.get("/get-movie-by-title", movieController.handleGetMovieByTitle);
  router.get(
    "/get-list-movies-title-and-code",
    movieController.handleGetListMoviesTitleAndCode
  );

  return app.use("/api/movie", router);
};

export default movieRoutes;
