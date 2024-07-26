import { Request, Response } from 'express';
import promotionService from '../services/promotionService';

const handleCreatePromotion = async (req: Request, res: Response) => {
  const data = req.body;
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
  const promoId = Number(req.params.promoId);
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
  const promoId = Number(req.params.promoId);
  if (isNaN(promoId)) {
    return res.status(400).json({ errCode: 2, error: 'Invalid promotion ID' });
  }
  const data = { ...req.body, promoId };
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
  const promoId = Number(req.params.promoId);
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
