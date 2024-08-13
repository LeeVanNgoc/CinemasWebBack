import express from "express";
import theaterController from "../controllers/theaterController";
import { Application } from "express";

const router = express.Router();

const theaterRoutes = (app: Application) => {
  router.post("/create-theater", theaterController.handleCreateTheater);
  router.get("/get-theater", theaterController.handleGetAllTheaters);
  router.put("/edit-theater", theaterController.handleUpdateTheater);
  router.delete("/delete-theater", theaterController.handleDeleteTheater);
  router.get("/get-theaters-by-code", theaterController.handleGetTheaterByCode);
  router.get("/get-theaters-by-city", theaterController.handleGetTheaterByCity);
  router.get(
    "/get-user-in-theaters-by-city",
    theaterController.handleGetUserInTheater
  );

  app.use("/api/theater", router);
};

export default theaterRoutes;
