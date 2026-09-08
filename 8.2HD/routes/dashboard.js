const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/ensureAuth');
const dashboardController = require('../controllers/dashboardController');

router.get('/', ensureAuth, dashboardController.show);

module.exports = router;