const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.get('/tasks', taskController.getAllTasks);

module.exports = router;
