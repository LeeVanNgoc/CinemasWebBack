import express from "express";
import bookedSeatController from "../controllers/bookedSeatController";
import { Application } from "express";

const router = express.Router();

const bookedSeatRouter = (app: Application) => {
  router.post("/create-booked-seat", bookedSeatController.handleBookSeat);
  router.get(
    "/get-row-and-col-of-seats",
    bookedSeatController.handleGetRowAndColOfSeats
  );
  router.get(
    "/get-row-and-col-of-booked-seat",
    bookedSeatController.handleGetRowAndColOfBookedSeat
  );
  app.use("/api/bookedSeat", router);
};

export default bookedSeatRouter;
