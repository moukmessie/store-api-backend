const express = require('express');
const  mongoose = require('mongoose');
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

/**
 * mongodb connection
 */
mongoose.connect('mongodb+srv://mouk:Mouk1996@openclass.izrbq.mongodb.net/Openclass?retryWrites=true&w=majority',
    {useNewUrlParser: true,
        useUnifiedTopology:true})
    .then(()=>console.log('Connexion à MongoDB réussie!'))
    .catch(()=>console.log('Connexion à MongoDB échoué !'));

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

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth',userRoutes);

module.exports= app;
