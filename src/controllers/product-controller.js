'use strict'

const { default: mongoose } = require("mongoose");

const Product = mongoose.model('Product');

/**
 * 
 * @param {*} req requisição
 * @param {*} res resposta
 * @param {*} next proximo
 */

// listar produtos
exports.get = (req, res, next) => {
    Product.find({ 
        active: true }, 'title price slug')
        .then(data => {
            res.status(200).send(data);

        }).catch(e => {
            res.status(400).send(e);
        });
}

// listar produtos pelo slug
exports.getBySlug = (req, res, next) => {
    Product.findOne({ 
        slug: req.params.slug,
        active: true },
         'title description price slug tags')
        .then(data => {
            res.status(200).send(data);

        }).catch(e => {
            res.status(400).send(e);
        });
}

// listar produtos pelo id
exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);

        }).catch(e => {
            res.status(400).send(e);
        });
}

// listar produtos pela tag
exports.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tags,
            active: true
        }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data);

        }).catch(e => {
            res.status(400).send(e);
        });
}



// Cadastrar produto
exports.post = (req, res, next) => {
    var product = new Product(req.body);

    product.save().then(x => {
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });

    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao cadastrar produto!', data: e
        });
    });

}

exports.put = (req, res, next) => {
   Product.findByIdAndUpdate(req.params.id,{
    $set:{
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        slug: req.body.slug,
    }
   }).then(()=>{
    res.status(201).send({
        message: 'Produto atualizado com sucesso!'
    });
   }).catch(e =>{
    res.status(400).send({
        message: 'Falha ao atualizar produto',
        data: e
    });
   });
}
// DELETA
exports.delete = (req, res, next) => {
    Product.findOneAndDelete(req.params.id /*req.body.id*/  ).then(()=>{
        res.status(200).send({
            message: 'Produto deletado com sucesso!'
        });
       }).catch(e =>{
        res.status(400).send({
            message: 'Falha ao deletar produto',
            data: e
        });
       });
}