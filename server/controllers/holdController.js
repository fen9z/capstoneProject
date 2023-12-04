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
    const holds = await Hold.find({ userId }).populate('productId');

    // return holds
    res.json(holds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// deleteHold - delete a hold
const deleteHold = async (req, res) => {
  try {
    // get holdId from req.params
    const holdId = req.params.id;

    // find and delete the hold
    // just use workout instead of hold
    const workout = await Hold.findOneAndDelete({ _id: holdId });

    if (!workout) {
      return res.status(400).json({ error: 'No such hold' });
    }
    // return deleted hold for client component context dispatch state change
    // this api matches with deleteWorkout api : client context/WorkoutContext.js
    // and in the context file: you can find data will filter use api return data
    // case 'DELETE_WORKOUT':
    //   return {
    //     workouts: state.workouts.filter((w) => w._id !== action.payload._id),
    //   };

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addHold,
  getUserHolds,
  deleteHold,
};
