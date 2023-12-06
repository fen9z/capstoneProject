const express = require('express');
const router = express.Router();

const {
  addHold,
  getUserHolds,
  getAllHolds,
  updateHold,
  cancelHold,
} = require('../controllers/holdController');
const requireAuth = require('../middleware/requireAuth');

router.post('/', requireAuth, addHold);

// get user holds by user id
router.get('/', requireAuth, getUserHolds);

// get all holds
router.get('/allHolds', getAllHolds);

// update a hold with id and new data
router.patch('/:id', requireAuth, updateHold);

// cancel a hold with id
router.patch('/cancel/:id', requireAuth, cancelHold);

module.exports = router;
