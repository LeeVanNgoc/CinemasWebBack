import News from "../models/News";

export const createNews = async (data: { title: string; content: string; image: string, link: string }) => {
  try {
    const existingIds = await News.findAll({
      attributes: ["newsId"],
      order: [["newsId", "ASC"]],
      raw: true,
    });

    let newId = 1;
    for (let i = 0; i < existingIds.length; i++) {
      if (existingIds[i].newsId !== newId) {
        break;
      }
      newId++;
    }

    const newNews = await News.create({
      newsId: newId,
      title: data.title,
      content: data.content,
      postDate: new Date(),
      image: data.image,
      link: data.link
    });

    return {
      errCode: 0,
      message: "News created successfully",
      news: newNews,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating news: ${error}`,
    };
  }
};

export const deleteNews = async (newsId: number) => {
  try {
    const news = await News.findOne({ where: { newsId: newsId } });
    if (!news) {
      return { errCode: 1, message: "News not found" };
    } else {
      await news.destroy();
      return { errCode: 0, message: "News deleted successfully" };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting news: ${error}`,
    };
  }
};

export const editNews = async (data: { newsId: number; title: string; content: string; image: string, link: string }) => {
  try {
    const news = await News.findOne({ where: { newsId: data.newsId } });
    if (!news) {
      return { errCode: 1, message: "News not found" };
    }

    Object.assign(news, data);
    await news.save();

    return {
      errCode: 0,
      message: "News updated successfully",
      news,
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating news: ${error}`,
    };
  }
};

export const getAllNews = async () => {
  try {
    const news = await News.findAll({
      attributes: ["newsId", "title", "content", "postDate", "image", "link"],
      raw: true,
    });
    return {
      errCode: 0,
      message: "Get all news success",
      news: news,
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting news: ${error}`,
    };
  }
};

export const getNewsById = async (newsId: number) => {
  try {
    const news = await News.findOne({
      where: { newsId: newsId },
      attributes: ["newsId", "title", "content", "postDate", "image", "link"],
      raw: true,
    });
    if (!news) {
      return {
        errCode: 1,
        message: "News not found",
      };
    }
    return {
      errCode: 0,
      message: "Get news success",
      news: news,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting news: ${error}`,
    };
  }
};
