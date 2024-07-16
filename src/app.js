'use strict';
const express = require('express');
const bodyParser = require('body-parser');
 
// -------- Conexao ---------
const mongoose = require('mongoose');
const app = express();
const config = require('./config')
// -------- Carrega os Models ---------
const Product = require('./models/product');
const Custumer = require('./models/custumer');
const Order = require('./models/order')

mongoose.connect(config.connectionString);

const router = express.Router();

// Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');
const custumerRoute = require('./routes/custumer-route');
const orderRoute = require('./routes/order-route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/',indexRoute);
app.use('/products',productRoute);
app.use('/custumers', custumerRoute)
app.use('/orders',orderRoute)

module.exports = app;
