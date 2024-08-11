import express, { Application } from "express";
import seatsController from "../controllers/seatsController";

const router = express.Router();

const seatRouter = (app: Application) => {
  router.post("/create-seat", seatsController.handleCreateSeat);
  router.delete("/delete-seat", seatsController.handleDeleteSeat);
  router.put("/edit-seat", seatsController.handleUpdateSeat);
  router.get("/get-seats", seatsController.handleGetAllSeats);
  router.get("/get-seat-by-id", seatsController.handleGetSeatById);
  router.get("/get-number-seat-in-room", seatsController.handleGetNumberSeatInRoom);
  router.get("/get-number-row-and-col-in-room", seatsController.handleGetNumberRowAndRow);
  router.post("/auto-create-seats", seatsController.handleAutoCreateSeats);
  router.get("/get-seats-in-one-room", seatsController.handleGetSeatInOneRoom);
  router.post("/create-multiple-seat", seatsController.handleCreateMultipleSeat);


  app.use("/api/seats", router);
};

export default seatRouter;
