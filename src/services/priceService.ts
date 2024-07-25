import Prices from "../models/Prices";

// Create a new price record
export const createPrice = async (data: any) => {
	try {
    const newPrice = await Prices.create({
      cost: data.cost,
      type: data.type,
      isweekend: data.isweekend,
    });
	if (!newPrice) {
		return {
			errCode: 2,
            message: 'False to create price record',
		}
	}
    return {
      newPrice,
      errCode : 0,
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
    const prices = await Prices.findAll();
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
 export const getPriceById = async (data: any) => {
  try {
    const price = await Prices.findOne({
		where: { priceId: data.priceId },
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
	const price = await Prices.findOne({
		where: {priceId : priceId}
	})
	if (!price) {
		return {
            errCode: 2,
            message: 'Price not found',
        }
	}
	price.cost = data.cost || price.cost
	price.type = data.type || price.type
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
 export const deletePrice = async (data: any) => {
  const priceId = data.priceId;
  try {
    const price = await Prices.findOne({
      where: { priceId: priceId },
    });
    if (!price) {
      return {
        errCode: 1,
        message: 'Price not found',
      }
    }
    await price.destroy();
    return {
      errCode: 0,
      message: 'Price deleted successfully',
    };
  } catch (error) {
    return {
      errCode: 3,
      message: `Error in deleting price by id ${error}`,
    };
  }
}
