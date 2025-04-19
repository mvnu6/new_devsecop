const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { syncDatabase } = require('./src/models');

// Chargement des variables d'environnement
dotenv.config();

// Création de l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Synchroniser les modèles avec la base de données
syncDatabase();

// Routes
const taskRoutes = require('./src/routes/TaskRoutes');
app.use('/api/tasks', taskRoutes);

// Route de test pour la santé de l'API
app.get('/to-do', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API fonctionne correctement!' });
});

// Port d'écoute du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});