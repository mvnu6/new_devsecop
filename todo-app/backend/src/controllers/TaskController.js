const { Task } = require('../models');

// Récupérer toutes les tâches
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    return res.status(500).json({ message: 'Erreur lors de la récupération des tâches' });
  }
};

// Créer une nouvelle tâche
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json(task);
  } catch (error) {
    console.error('Erreur lors de la création de la tâche:', error);
    return res.status(400).json({ 
      message: 'Erreur lors de la création de la tâche',
      errors: error.errors?.map(e => e.message) 
    });
  }
};

// Récupérer une tâche par ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    
    return res.status(200).json(task);
  } catch (error) {
    console.error('Erreur lors de la récupération de la tâche:', error);
    return res.status(500).json({ message: 'Erreur lors de la récupération de la tâche' });
  }
};

// Mettre à jour une tâche
exports.updateTask = async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated === 0) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    
    const updatedTask = await Task.findByPk(req.params.id);
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error);
    return res.status(400).json({ 
      message: 'Erreur lors de la mise à jour de la tâche',
      errors: error.errors?.map(e => e.message) 
    });
  }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted === 0) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    
    return res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error);
    return res.status(500).json({ message: 'Erreur lors de la suppression de la tâche' });
  }
};