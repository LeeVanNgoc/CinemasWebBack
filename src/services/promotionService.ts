import Promotion from "../models/Promotion";

interface PromotionData {
  description: string;
  discount: string;
  startDate: Date;
  endDate: Date;
}

export const createPromotion = async (data: PromotionData) => {
  try {
    const existingIds = await Promotion.findAll({
      attributes: ["promoId"],
      order: [["promoId", "ASC"]],
    });

    const ids = existingIds.map((promo) => promo.promoId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }

    const existingCodes = await Promotion.findAll({
      attributes: ["promoCode"],
      order: [["promoCode", "ASC"]],
    });

    const codes = existingCodes.map((promo) => promo.promoCode);
    let newCode = "PM001";
    if (newId < 10) {
      while (codes.includes(newCode)) {
        newCode = "PM00" + newId;
      }
    } else if (newId >= 10 && newId < 100) {
      while (codes.includes(newCode)) {
        newCode = "PM0" + newId;
      }
    } else {
      while (codes.includes(newCode)) {
        newCode = "PM" + newId;
      }
    }

    const newPromotion = await Promotion.create({
      promoId: newId,
      promoCode: newCode,
      description: data.description,
      discount: data.discount,
      startDate: data.startDate,
      endDate: data.endDate,
    });

    return {
      errCode: 0,
      message: "Promotion created successfully",
      promotion: newPromotion,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error creating promotion: ${error}`,
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
      message: `Error deleting promotion: ${error}`,
    };
  }
};

export const editPromotion = async (data: any) => {
  const { promoId, description, discount, startDate, endDate } = data;

  try {
    if (!promoId) {
      return { errCode: 4, message: "Missing required parameters!" };
    }

    const promotion = await Promotion.findOne({ where: { promoId } });
    if (!promotion) {
      return { errCode: 1, message: "Promotion not found!" };
    }

    if (description !== undefined) promotion.description = description;
    if (discount !== undefined) promotion.discount = discount;
    if (startDate !== undefined) promotion.startDate = startDate;
    if (endDate !== undefined) promotion.endDate = endDate;

    await promotion.save();

    return {
      errCode: 0,
      message: "Update the promotion succeeds!",
      promotion,
    };
  } catch (error) {
    return {
      errCode: 2,
      message: `Error updating promotion: ${error}`,
    };
  }
};

export const getAllPromotions = async () => {
  try {
    const promotions = await Promotion.findAll();
    return {
      errCode: 0,
      message: "Get all promotions success",
      promotions,
    };
  } catch (error) {
    return {
      errCode: 1,
      message: `Error getting promotions: ${error}`,
    };
  }
};

export const getPromotionById = async (promoId: number) => {
  try {
    const promotion = await Promotion.findOne({ where: { promoId } });
    if (!promotion) {
      return {
        errCode: 1,
        message: "Promotion not found",
      };
    }
    return {
      errCode: 0,
      message: "Get promotion success",
      promotion,
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error getting promotion: ${error}`,
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
