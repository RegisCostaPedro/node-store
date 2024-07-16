'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');
// /products
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tags', controller.getByTag);
router.post('/',authService.authorize, controller.post);
router.put('/:id',authService.authorize, controller.put);
router.delete('/:id', authService.authorize, controller.delete); /*router.delete('/:id',controller.delete); */


module.exports = router;
