// controllers/holdController.js
const Hold = require('../models/holdModel');

// addHold
const addHold = async (req, res) => {
  try {
    // get userId and productId from req.body
    const { productId } = req.body;
    const userId = req.user._id;

    // create new hold with userId and productId then save
    const hold = new Hold({
      userId,
      productId,
    });
    await hold.save();

    // return new hold
    res.json(hold);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getUserHolds
const getUserHolds = async (req, res) => {
  try {
    // get userId from req.params.userId
    const userId = req.user._id;

    // use userId to find holds and populate productId
    const holds = await Hold.find({ userId })
      .populate('productId')
      .populate('whoCancelled');

    // return holds
    res.json(holds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getallHolds
const getAllHolds = async (req, res) => {
  try {
    let filter = req.query.filter || ''; // from url get filter parameter
    let filterRegex = new RegExp(filter, 'i'); // create regex for filter
    // console.log('filterRegex:', filterRegex);

    // find all holds and populate productId and populate userId
    // filter by userId.firstName and productId.name
    // lookup users and products based on userId and productId
    // pay attention to the unwind after the lookup, and before the match
    // step 1: $lookup  step 2: $unwind  step 3: $match filter
    const holds = await Hold.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$user' }, // unwind the user array
      { $unwind: '$product' }, // unwind the product array
      {
        $match: {
          $or: [
            { 'user.email': { $regex: filterRegex } },
            { 'product.itemId': { $regex: filterRegex } },
            // add more filters as needed
          ],
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    if (!holds) {
      return res.status(400).json({ error: 'No holds found' });
    }
    res.status(200).json(holds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// updateHold
const updateHold = async (req, res) => {
  try {
    // get holdId from req.params
    const holdId = req.params.id;
    // update action must pay attention to isCancelled ture or false
    // if isCancelled is true, cancelTime and whoCancelled will be set, if iscancelled is false, cancelTime and whoCancelled will be null
    const cancelInfo = req.body.isCancelled
      ? { cancelTime: new Date(), whoCancelled: req.user._id }
      : { cancelTime: null, whoCancelled: null };
    // update the hold
    const hold = await Hold.findOneAndUpdate(
      { _id: holdId },
      { ...req.body, ...cancelInfo },
      {
        new: true, // return updated hold, if false return old hold
      }
    )
      .populate('productId')
      .populate('userId');

    if (!hold) {
      return res.status(400).json({ error: 'No such hold' });
    }
    // return updated hold populated with user and product
    res.status(200).json(hold);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// cancelHold - cancel a hold
const cancelHold = async (req, res) => {
  try {
    // get holdId from req.params
    const holdId = req.params.id;
    // find and update the hold to cancel
    const hold = await Hold.findOneAndUpdate(
      { _id: holdId },
      {
        isCancelled: true,
        cancelTime: new Date(),
        whoCancelled: req.user._id,
      },
      {
        new: true, // return updated hold, if false return old hold
      }
    ).populate('whoCancelled');
    if (!hold) {
      return res.status(400).json({ error: 'No such hold' });
    }
    res.status(200).json(hold);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addHold,
  getUserHolds,
  updateHold,
  getAllHolds,
  cancelHold,
};
