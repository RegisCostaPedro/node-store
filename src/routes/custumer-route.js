'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/custumer-controller');
const authService = require('../services/auth-service');

router.post('/', controller.post);
router.get('/', controller.get);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token',authService.authorize, controller.refreshToken);

module.exports = router;
