import Posts from "../models/Posts";

export const createNewPost = async (data: {
  title: string;
  content: string;
  image: string;
  link: string;
}) => {
  try {
    const existingIds = await Posts.findAll({
      attributes: ["postId"],
      order: [["postId", "ASC"]],
      raw: true,
    });

    let newId = 1;
    for (let i = 0; i < existingIds.length; i++) {
      if (existingIds[i].postId !== newId) {
        break;
      }
      newId++;
    }

    const existingCodes = await Posts.findAll({
      attributes: ["postCode"],
      order: [["postCode", "ASC"]],
    });

    const codes = existingCodes.map((posts) => posts.postCode);
    let newCode = "NS001";
    if (newId < 10) {
      while (codes.includes(newCode)) {
        newCode = "NS00" + newId;
      }
    } else if (newId >= 10 && newId < 100) {
      while (codes.includes(newCode)) {
        newCode = "NS0" + newId;
      }
    } else {
      while (codes.includes(newCode)) {
        newCode = "NS " + newId;
      }
    }

    const newPost = await Posts.create({
      postId: newId,
      postCode: newCode,
      title: data.title,
      content: data.content,
      postDate: new Date(),
      image: data.image,
      link: data.link,
    });

    return {
      errCode: 0,
      message: "Post created successfully",
      posts: newPost,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating posts: ${error}`,
    };
  }
};

export const deletePost = async (postCode: string) => {
  try {
    const post = await Posts.findOne({ where: { postCode: postCode } });
    if (!post) {
      return { errCode: 1, message: "Post not found" };
    } else {
      await post.destroy();
      return { errCode: 0, message: "Post deleted successfully" };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting post: ${error}`,
    };
  }
};

export const editPost = async (data: {
  postCode: string;
  title: string;
  content: string;
  image: string;
  link: string;
}) => {
  try {
    const post = await Posts.findOne({ where: { postCode: data.postCode } });
    if (!post) {
      return { errCode: 1, message: "posts not found" };
    }

    Object.assign(post, data);
    await post.save();

    return {
      errCode: 0,
      message: "Post updated successfully",
      post,
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating posts: ${error}`,
    };
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await Posts.findAll({
      attributes: [
        "postId",
        "postCode",
        "title",
        "content",
        "postDate",
        "image",
        "link",
      ],
      raw: true,
    });
    return {
      errCode: 0,
      message: "Get all posts success",
      posts: posts,
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting posts: ${error}`,
    };
  }
};

export const getPostByCode = async (postCode: string) => {
  try {
    const post = await Posts.findOne({
      where: { postCode: postCode },
      attributes: ["postCode", "title", "content", "postDate", "image", "link"],
      raw: true,
    });
    if (!post) {
      return {
        errCode: 1,
        message: "Post not found",
      };
    }
    return {
      errCode: 0,
      message: "Get posts success",
      post: post,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting posts: ${error}`,
    };
  }
};
