const express = require('express');
const  mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const stuffRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

/**
 * mongodb connection
 */
const {
    DB_USER,
    DB_PWD,
    DB_URL,
    DB_NAME
} = process.env;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PWD}@${DB_URL}/${DB_NAME}?retryWrites=true&w=majority`)
    .then(()=> {
        console.log('Connexion à MongoDB réussie!!')
    })
    .catch(err => {
        console.log('Connexion à MongoDB échoué  : ' + err)
    });

const app = express();

//CORS setHeader
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use('/image', express.static(path.join(__dirname, 'image')));

app.use('/api/product', stuffRoutes);
app.use('/api/auth',userRoutes);

module.exports= app;
