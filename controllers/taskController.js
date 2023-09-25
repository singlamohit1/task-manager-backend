const { Task } = require('../models');

exports.createTask = async (req, res) => {
  try {
    const { title, status, dueDate } = req.body;
    const task = await Task.create({ title, status, dueDate });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status, dueDate } = req.body;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.update({ title, status, dueDate });
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const tasks = await Task.findAll({
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};
