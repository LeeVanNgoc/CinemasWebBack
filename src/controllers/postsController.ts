import { Request, Response } from "express";
import {
  createNewPost,
  deletePost,
  editPost,
  getAllPosts,
  getPostByCode,
} from "../services/postsService";

const handleCreateNewPost = async (req: Request, res: Response) => {
  const title = req.query.title as string;
  const content = req.query.content as string;
  const image = req.query.image as string;
  const link = req.query.link as string;

  if (!title) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing title parameters" });
  }
  if (!content) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing content parameter" });
  }
  if (!image) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing image parameter" });
  }
  if (!link) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing link parameter" });
  }

  try {
    const result = await createNewPost({ title, content, image, link });
    if (result.errCode !== 0) {
      return res
        .status(400)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(201).json({
      errCode: result.errCode,
      message: result.message,
      posts: result.posts,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in creating post: ${error}`,
    });
  }
};

const handleDeletePost = async (req: Request, res: Response) => {
  const postCode = req.query.postCode as string;

  if (postCode === undefined) {
    return res.status(400).json({ errCode: 2, error: "Invalid post Code" });
  }
  try {
    const result = await deletePost(postCode);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in deleting post: ${error}`,
    });
  }
};

const handleEditPost = async (req: Request, res: Response) => {
  const postCode = req.query.postCode as string;
  const title = req.query.title as string;
  const content = req.query.content as string;
  const image = req.query.image as string;
  const link = req.query.link as string;

  if (postCode === undefined) {
    return res.status(400).json({ errCode: 2, error: "Invalid post Code" });
  }
  if (!title) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing title parameters" });
  }
  if (!content) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing content parameter" });
  }
  if (!image) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing image parameter" });
  }
  if (!link) {
    return res
      .status(400)
      .json({ errCode: 2, error: "Missing link parameter" });
  }

  try {
    const result = await editPost({ postCode, title, content, image, link });
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      post: result.post,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in editing post: ${error}`,
    });
  }
};

const handleGetAllPosts = async (req: Request, res: Response) => {
  try {
    const result = await getAllPosts();
    if (result.errCode !== 0) {
      return res
        .status(400)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      posts: result.posts,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting post: ${error}`,
    });
  }
};

const handleGetPostByCode = async (req: Request, res: Response) => {
  const postCode = req.query.postCode as string;
  if (postCode === undefined) {
    return res.status(400).json({ errCode: 2, error: "Invalid post Code" });
  }
  try {
    const result = await getPostByCode(postCode);
    if (result.errCode !== 0) {
      return res
        .status(404)
        .json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({
      errCode: result.errCode,
      message: result.message,
      post: result.post,
    });
  } catch (error) {
    res.status(500).json({
      errCode: 3,
      error: `Something went wrong in getting post: ${error}`,
    });
  }
};

export default {
  handleCreateNewPost,
  handleDeletePost,
  handleEditPost,
  handleGetAllPosts,
  handleGetPostByCode,
};
