'use strict'

const { default: mongoose } = require("mongoose");

const Custumer = mongoose.model('Custumer');
const ValidationContract = require('../validators/fluent-validator');
const custumerRepository = require('../repositories/custumer-repository');
const authService = require('../services/auth-service');
const md5 = require('md5');
const bcrypt = require('bcrypt');


exports.get = async(req, res, next) =>{
    try {
        var data = await custumerRepository.get();


        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
        console.log(error);
    }
 
}


// Cadastrar cliente
exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email,  'Email inválido');
    contract.hasMinLen(req.body.password, 3, 'O senha deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    // const userPassword = req.body.password; 
    // bcrypt.hash(userPassword,  global.SALT_KEY)

    try {
     
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await custumerRepository.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
            //md5 -> password: md5(req.body.password + global.SALT_KEY),
        });

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

// AUTENTICAR CLIENTE
exports.authenticate = async (req, res, next) => {
  
    // const userPassword = req.body.password; 
    // bcrypt.hash(userPassword,  global.SALT_KEY)
    try {
        const hashedPassword = await bcrypt.hashSync(req.body.password, 10);

    console.log(req.body.email);
    console.log(hashedPassword);

      const custumer = await  custumerRepository.authenticate({
            email: req.body.email,
            password: req.body.password 
        });
 console.log(custumer);
         if(!custumer){
             res.status(404).send({
               message:'Usuário ou senha inválidos'
               });
               return;
         }

     const token = await authService.generateToken({
            email: custumer.email,
             name: custumer.name
        })

        res.status(201).send({
          token:token,
          data:{
            email: custumer.email,
             name: custumer.name
          }
        });
    } catch (error) {
        console.error('Erro ao autenticar cliente:', error);
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};