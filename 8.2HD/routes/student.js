const express = require('express');
const router = express.Router();

// Identity endpoint for SIT725 Task 8.2HD.
// Mounted under /api, so the full path is GET /api/student
router.get('/student', (req, res) => {
  res.json({
    name: 'RANASINGHAGE SHENOLI PAWANGA SATHSARANI',
    studentId: '225764303'
  });
});

module.exports = router;
