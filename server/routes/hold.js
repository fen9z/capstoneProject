const express = require('express');
const router = express.Router();

const {
  addHold,
  getUserHolds,
  deleteHold,
} = require('../controllers/holdController');
const requireAuth = require('../middleware/requireAuth');

router.post('/', requireAuth, addHold);
router.get('/', requireAuth, getUserHolds);

// delete hold
router.delete('/:id', requireAuth, deleteHold);

module.exports = router;
