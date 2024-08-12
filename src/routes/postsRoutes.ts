import express from "express";
import postsController from "../controllers/postsController";
import { Application } from "express-serve-static-core";

const router = express.Router();

const postsRoutes = (app: Application) => {
  router.post("/create-new-post", postsController.handleCreateNewPost);
  router.delete("/delete-post", postsController.handleDeletePost);
  router.put("/edit-post", postsController.handleEditPost);
  router.get("/get-all-posts", postsController.handleGetAllPosts);
  router.get("/get-post-by-code", postsController.handleGetPostByCode);

  return app.use("/api/posts", router);
};

export default postsRoutes;
