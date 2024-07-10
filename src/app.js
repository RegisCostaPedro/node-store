'use strict';
const express = require('express');
const bodyParser = require('body-parser');
 
// -------- Conexao ---------
const mongoose = require('mongoose');
const app = express();

const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/node-store');

const router = express.Router();

// Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/',indexRoute);
app.use('/products',productRoute);


module.exports = app;
