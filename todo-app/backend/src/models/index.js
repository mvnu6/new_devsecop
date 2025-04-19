const sequelize = require('../config/db');
const Task = require('./task');
require('./src/server');

// Synchroniser les modèles avec la base de données
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');
    
    // Créer les tables si elles n'existent pas
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Modèles synchronisés avec la base de données.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  }
};

module.exports = {
  syncDatabase,
  Task
};