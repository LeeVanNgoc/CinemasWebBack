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
    "/get-all-plan-screen-code-for-create-ticket",
    planScreenMovieController.handleGetplanScreenMovieCodeForCreateTicket
  );
  router.get("/get-start-time", planScreenMovieController.handleGetStartTime);
  router.get(
    "/get-list-plan-information",
    planScreenMovieController.handleGetListPlanScreenInformation
  );
  router.get(
    "/get-movie-details-by-date",
    planScreenMovieController.handleGetMovieDetailsByDate
  );
  router.get(
    "/get-monthly-movie-stats",
    planScreenMovieController.handleGetMonthlyMovieStats
  );
  router.get(
    "/get-movie-in-room",
    planScreenMovieController.handleGetMovieInRoom
  );
  router.get(
    "/get-screening-schedule",
    planScreenMovieController.handleGetScreeningSchedule
  );

  return app.use("/api/plan-screen-movie", router);
};
export default planScreenMovieRoutes;
