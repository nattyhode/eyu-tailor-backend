const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/authController');

// የሎጊን ጥያቄዎችን ወደ ኮንትሮለሩ መምሪያ
router.post('/login', loginAdmin);

module.exports = router;
