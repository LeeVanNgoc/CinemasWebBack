import { Request, Response, NextFunction } from 'express';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    statusCode: 404,
    message: 'Resource Not Found',
  });
};

export default notFoundHandler;
