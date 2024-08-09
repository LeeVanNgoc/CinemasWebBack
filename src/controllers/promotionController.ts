import { Request, Response } from 'express';
import promotionService from '../services/promotionService';

const handleCreatePromotion = async (req: Request, res: Response) => {
  const { description, discount, startDate, endDate } = req.query;

  if (!description || !discount || !startDate || !endDate) {
    return res.status(400).json({ errCode: 4, error: 'Missing required parameters!' });
  }

  const data = {
    description: description as string,
    discount: discount as string,
    startDate: new Date(startDate as string),
    endDate: new Date(endDate as string),
  };

  try {
    const result = await promotionService.createPromotion(data);
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(201).json({ errCode: result.errCode, message: result.message, promotion: result.promotion });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in creating promotions: ${error}` });
  }
};

const handleDeletePromotion = async (req: Request, res: Response) => {
  const promoId = Number(req.query.promoId);
  if (isNaN(promoId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid promotion ID' });
  }
  try {
    const result = await promotionService.deletePromotion(promoId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in deleting promotions: ${error}` });
  }
};

const handleEditPromotion = async (req: Request, res: Response) => {
  const promoId = Number(req.query.promoId);
  if (isNaN(promoId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid promotion ID' });
  }

  const data = {
    promoId,
    description: req.query.description as string,
    discount: req.query.discount as string,
    startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
    endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
  };

  try {
    const result = await promotionService.editPromotion(data);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, promotion: result.promotion });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in editing promotions: ${error}` });
  }
};

const handleGetAllPromotions = async (req: Request, res: Response) => {
  try {
    const result = await promotionService.getAllPromotions();
    if (result.errCode !== 0) {
      return res.status(400).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, promotions: result.promotions });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting promotions: ${error}` });
  }
};

const handleGetPromotionById = async (req: Request, res: Response) => {
  const promoId = Number(req.query.promoId);
  if (isNaN(promoId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid promotion ID' });
  }
  try {
    const result = await promotionService.getPromotionById(promoId);
    if (result.errCode !== 0) {
      return res.status(404).json({ errCode: result.errCode, error: result.message });
    }
    res.status(200).json({ errCode: result.errCode, message: result.message, promotion: result.promotion });
  } catch (error) {
    res.status(500).json({ errCode: 3, error: `Something went wrong in getting promotion: ${error}` });
  }
};

export default {
  handleCreatePromotion,
  handleDeletePromotion,
  handleEditPromotion,
  handleGetAllPromotions,
  handleGetPromotionById
};
