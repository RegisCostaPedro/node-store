'use strict'

const { default: mongoose } = require("mongoose");

const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const productRepository = require('../repositories/productRepository')
/**
 * 
 * @param {*} req requisição
 * @param {*} res resposta
 * @param {*} next proximo
 */

// listar produtos
exports.get = (req, res, next) => {
    productRepository
        .get()
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}

// listar produtos pelo slug
exports.getBySlug = (req, res, next) => {
    productRepository.getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data);

        }).catch(e => {
            res.status(400).send(e);
        });
}

// listar produtos pelo id
exports.getById = (req, res, next) => {
    productRepository.getById(req.params.id)
        .then(data => {
            res.status(200).send(data);

        }).catch(e => {
            res.status(400).send(e);
        });
}

// listar produtos pela tag
exports.getByTag = (req, res, next) => {
    productRepository.getByTag(req.params.tags)
        .then(data => {
            res.status(200).send(data);

        }).catch(e => {
            res.status(400).send(e);
        });
}



// Cadastrar produto
exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O titulo deve ter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O titulo deve ter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    productRepository
        .create(req.body).then(x => {
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
    productRepository.update(req.params.id, req.body)
        .then(() => {
            res.status(201).send({
                message: 'Produto atualizado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar produto',
                data: e
            });
        });
}
// DELETA
exports.delete = (req, res, next) => {
    productRepository.delete(req.params.id)
        .then(() => {
            res.status(200).send({
                message: 'Produto deletado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao deletar produto',
                data: e
            });
        });
}