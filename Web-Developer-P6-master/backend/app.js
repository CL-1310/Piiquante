const express = require('express');

const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://CL-1310:ytCkTcz5PdFetc@cluster0.ughiqby.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.post('/api/stuff', (req, res) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });

module.exports = app;