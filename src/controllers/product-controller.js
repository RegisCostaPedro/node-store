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
exports.get = async (req, res, next) => {
    try {
        var data = await productRepository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }


}

// listar produtos pelo slug
exports.getBySlug = async (req, res, next) => {
    try {
        var data = await productRepository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição'
        });
    }

}

// listar produtos pelo id
exports.getById = async (req, res, next) => {
    try {
        var data = await productRepository.getById(req.params.id)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição'
        });
    }


}

// listar produtos pela tag
exports.getByTag = async (req, res, next) => {
    try {
        const data = await productRepository.getByTag(req.params.tags)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}



// Cadastrar produto
exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
   
        await productRepository.create(req.body);
        res.status(201).send({
            message: 'Produto cadastrado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
        console.log(e);
    }
};

exports.put = async (req, res, next) => {
    try {
        await productRepository.update(req.params.id, req.body);
        res.status(201).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }

}
// DELETA
exports.delete = async (req, res, next) => {
    try {
        await productRepository.delete(req.params.id);
        res.status(200).send({
            message: 'Produto deletado com sucesso!'
        });
    } catch (error) {
        res.status(400).send({
            message: 'Falha ao processar sua requisição'
        });
    }

}
