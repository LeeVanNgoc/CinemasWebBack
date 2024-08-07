import Price from "../models/Price";

// Create a new price record
export const createPrice = async (data: any) => {
  try {
    const existingIds = await Price.findAll({
      attributes: ['priceId'],
      order: [['priceId', 'ASC']]
    });

    const ids = existingIds.map(prices => prices.priceId);

    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }
    const newPrice = await Price.create({
      priceId: newId,
      cost: data.cost,
      roomType: data.roomType,
      seatType: data.seatType,
      isWeekend: data.isWeekend,
    });
    if (!newPrice) {
      return {
        errCode: 1,
        message: 'False to create price record',
      }
    }
    return {
      newPrice,
      errCode: 0,
      message: 'Price created successfully',
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error in creating by ${error}`,
    };
  }
}

// Get all price records
export const getAllPrices = async () => {
  try {
    const prices = await Price.findAll();
    if (!prices) {
      return {
        errCode: 1,
        message: 'No prices found',
      }
    }
    return {
      prices,
      errCode: 0,
      message: 'Prices fetched successfully',
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error in getting prices by ${error}`,
    };
  }
}

// Get a specific price record
export const getPriceById = async (priceId: number) => {
  try {
    const price = await Price.findOne({
      where: { priceId: priceId },
      raw: true,
    });
    if (!price) {
      return {
        errCode: 1,
        message: 'Price not found',
      }
    }

    return {
      price,
      errCode: 0,
      message: 'Price fetched successfully',
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error in getting price by id ${error}`,
    };
  }
}

// Update a specific price record
export const updatePrice = async (data: any) => {
  const priceId = data.priceId;
  try {
    const price = await Price.findOne({
      where: { priceId: priceId },
    })
    if (!price) {
      return {
        errCode: 1,
        message: 'Price not found',
      }
    }
    price.cost = data.cost || price.cost
    price.roomType = data.roomType || price.roomType
    price.seatType = data.seatType || price.seatType
    price.isWeekend = data.isWeekend || price.isWeekend
    await price.save();
    return {
      price: price,
      errCode: 0,
      message: 'Price updated successfully',
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error in updating price by id ${error}`,
    };
  }
}

// Delete a specific price record
export const deletePrice = async (priceId: number) => {
  try {
    const price = await Price.findOne({
      where: { priceId },
    });
    if (!price) {
      return {
        errCode: 1,
        message: 'Price not found',
      }
    } else {
      await price.destroy();
      return {
        errCode: 0,
        message: 'Price deleted successfully',
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error in deleting price by id ${error}`,
    };
  }
}

export const getCost = async (data: any) => {
  try {
    if (!data.roomType || !data.seatType || typeof data.isWeekend === 'undefined') {
      return {
        errCode: 2,
        message: 'Missing required parameters',
      };
    }

    const isWeekendValue = parseInt(data.isWeekend) === 1 ? 1 : 0;

    const costs = await Price.findAll({
      where: {
        roomType: data.roomType,
        seatType: data.seatType,
        isWeekend: isWeekendValue,
      },
      attributes: ['cost'],
      raw: true
    });

    if (costs.length > 0) {
      const costOutput = costs.map(item => item.cost);
      return {
        errCode: 0,
        message: 'Get cost success',
        costOutput,
      };
    } else {
      return {
        errCode: 1,
        message: 'No cost found',
      };
    }
  } catch (error) {
    console.error('Error in getting cost:', error);
    return {
      errCode: 3,
      message: `Error getting cost: ${error}`,
    };
  }
};
