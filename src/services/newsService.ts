import News from '../models/News';

export const createNews = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newNews = await News.create(data);
      resolve(newNews);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteNews = async (newsId: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const news = await News.findOne({ where: { id: newsId } });
      if (!news) {
        resolve({ errorCode: 1, errorMessage: "Not found news" });
      } else {
        await news.destroy();
        resolve({ errorCode: 0, errorMessage: "News deleted successfully" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const editNews = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    const id = data.id;
    try {
      if (!id) {
        return resolve({ error: 'Missing required parameters!' });
      }

      const news = await News.findOne({ where: { id } });
      if (!news) {
        return resolve({ error: 'News not found!' });
      } else {
        Object.assign(news, data);
        await news.save();
      }

      resolve({ message: 'Update the news succeeds!', news });
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllNews = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const news = await News.findAll();
      resolve(news);
    } catch (error) {
      reject(error);
    }
  });
};

export const getNewsById = async (newsId: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const news = await News.findOne({ where: { id: newsId } });
      resolve(news);
    } catch (error) {
      reject(error);
    }
  });
};
