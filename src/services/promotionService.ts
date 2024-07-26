import Promotion from '../models/Promotion';

interface PromotionData {
  description: string;
  discount: string;
  startDate: Date;
  endDate: Date;
}

export const createPromotion = async (data: PromotionData) => {
  try {
    const existingIds = await Promotion.findAll({
      attributes: ['promoId'],
      order: [['promoId', 'ASC']]
    });

    const ids = existingIds.map(promo => promo.promoId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const newPromotion = await Promotion.create({
      promoId: newId,
      description: data.description,
      discount: data.discount,
      startDate: data.startDate,
      endDate: data.endDate,
    });

    return {
      errCode: 0,
      message: 'Promotion created successfully',
      promotion: newPromotion
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating promotion: ${error}`
    };
  }
};

export const deletePromotion = async (promoId: number) => {
  try {
    const promotion = await Promotion.findOne({ where: { promoId } });
    if (!promotion) {
      return { errCode: 1, message: "Promotion not found" };
    } else {
      await promotion.destroy();
      return { errCode: 0, message: "Promotion deleted successfully" };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error deleting promotion: ${error}`
    };
  }
};

export const editPromotion = async (data: any) => {
  const promoId = data.promoId;
  try {
    if (!promoId) {
      return { errCode: 4, message: 'Missing required parameters!' };
    }

    const promotion = await Promotion.findOne({ where: { promoId } });
    if (!promotion) {
      return { errCode: 1, message: 'Promotion not found!' };
    }

    Object.assign(promotion, data);
    await promotion.save();

    return { 
      errCode: 0,
      message: 'Update the promotion succeeds!',
      promotion
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating promotion: ${error}`
    };
  }
};

export const getAllPromotions = async () => {
  try {
    const promotions = await Promotion.findAll();
    return {
      errCode: 0,
      message: 'Get all promotions success',
      promotions
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting promotions: ${error}`
    };
  }
};

export const getPromotionById = async (promoId: number) => {
  try {
    const promotion = await Promotion.findOne({ where: { promoId } });
    if (!promotion) {
      return {
        errCode: 1,
        message: 'Promotion not found'
      };
    }
    return {
      errCode: 0,
      message: 'Get promotion success',
      promotion
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting promotion: ${error}`
    };
  }
};

export default {
  createPromotion,
  deletePromotion,
  editPromotion,
  getAllPromotions,
  getPromotionById,
};
