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


app.use(bodyParser.json({
    limit:'5mb'
}));
app.use(bodyParser.urlencoded({extended: false}));


// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/',indexRoute);
app.use('/products',productRoute);
app.use('/custumers', custumerRoute)
app.use('/orders',orderRoute)

module.exports = app;
