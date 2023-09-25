const express = require('express');
const router = express.Router();
const taskMetricsController = require('../controllers/taskMetricsController');

router.get('/task-metrics', taskMetricsController.getTaskMetrics);

module.exports = router;
