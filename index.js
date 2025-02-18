require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/mongodb');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/profiles', routes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
