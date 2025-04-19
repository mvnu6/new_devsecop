
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

// Routes pour les tâches
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;