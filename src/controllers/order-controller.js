'use strict'

const { default: mongoose } = require("mongoose");

const Order = mongoose.model('Order');
const ValidationContract = require('../validators/fluent-validator');
const orderRepository = require('../repositories/order-repository');
const guid = require('guid');

exports.get = async(req, res, next) =>{
    try {
        var data = await orderRepository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
        console.log(error);
    }
 
}


// Cadastrar pedido
exports.post = async (req, res, next) => {
    let data = {
      
    }
    data.number = guid.raw().substring(0, 6);

    try {
        await orderRepository.create({ 
            custumer : req.body.custumer,
            number :  guid.raw().substring(0, 6),
            items : req.body.items,

        });
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
        console.log(e);
    }
};