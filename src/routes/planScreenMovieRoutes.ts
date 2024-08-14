import express from "express";
import planScreenMovieController from "../controllers/planScreenMovieController";
import { Application } from "express-serve-static-core";

const router = express.Router();

const planScreenMovieRoutes = (app: Application) => {
  router.delete(
    "/delete-plan-screen-movie",
    planScreenMovieController.handleDeletePlanScreenMovie
  );
  router.put(
    "/edit-plan-screen-movie",
    planScreenMovieController.handleEditPlanScreenMovie
  );
  router.get(
    "/get-all-plan-screen-movies",
    planScreenMovieController.handleGetAllPlanScreenMovies
  );
  router.get(
    "/get-plan-screen-movie-by-code",
    planScreenMovieController.handleGetPlanScreenMovieByCode
  );
  router.post(
    "/create-plan-screen-movie",
    planScreenMovieController.handleCreatePlanScreenMovie
  );
  router.get(
    "/get-all-plan-screen-id-for-create-ticket",
    planScreenMovieController.handleGetplanScreenMovieIdForCreateTicket
  );
  router.get("/get-start-time", planScreenMovieController.handleGetStartTime);
  return app.use("/api/plan-screen-movie", router);
};
export default planScreenMovieRoutes;
