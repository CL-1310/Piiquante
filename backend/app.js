const express = require('express');

const mongoose = require('mongoose');

const userRoutes = require("./routes/userRoutes");

const app = express();

const Sauce = require('./models/Sauce');

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

app.use(express.json())

app.use("/api/auth", userRoutes)
//app.use('/api/sauces', sauceRoutes);


module.exports = app;