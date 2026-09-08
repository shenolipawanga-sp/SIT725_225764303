const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/ensureAuth');
const subjectController = require('../controllers/subjectController');

router.get('/', ensureAuth, subjectController.list);
router.post('/', ensureAuth, subjectController.create);
router.post('/:id/delete', ensureAuth, subjectController.remove);

module.exports = router;