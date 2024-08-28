import express from "express";
import ticketsController from "../controllers/ticketsController";
import { Application } from "express";

const router = express.Router();

const ticketRoutes = (app: Application) => {
  router.post("/create-ticket", ticketsController.handleCreateTicket);
  router.delete("/delete-ticket", ticketsController.handleDeleteTicket);
  router.put("/edit-ticket", ticketsController.handleEditTicket);
  router.get("/get-tickets", ticketsController.handleGetTicketByCode);
  router.get("/get-list-tickets", ticketsController.handleGetListTicket);
  router.get(
    "/get-ticket-by-user-code",
    ticketsController.handleGetTicketByUserCode
  );
  router.get(
    "/get-ticket-details",
    ticketsController.handleGetTicketDetailsByCode
  );
  router.get(
    "/sending-bill-details",
    ticketsController.handleGetTicketDetailsByCode
  );
  router.get("/get-revenue-by-date", ticketsController.handleGetRevenueByDate);
  router.get(
    "/get-revenue-by-theater-and-date",
    ticketsController.handleGetRevenueByTheaterAndDate
  );
  router.get(
    "/get-revenue-by-movie",
    ticketsController.handleGetRevenueByMovie
  );
  router.get(
    "/get-revenue-for-all-movie",
    ticketsController.handleGetRevenueForAllMovie
  );
  router.get(
    "/get-all-ticket-for-all-user",
    ticketsController.handleGetAllTicketForUser
  );
  router.get(
    "/get-average-age-of-user",
    ticketsController.handleGetAverageAgeOfUsers
  );
  router.get("/average-age-by-theater", ticketsController.handleGetAverageAgeByTheater);
  router.get(
    "/get-list-tickets-by-theater",
    ticketsController.handleGetListTicketByTheaterCode
  );
  return app.use("/api/ticket", router);
};

export default ticketRoutes;
