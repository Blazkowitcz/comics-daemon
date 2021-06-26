const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

/**
 * POST Route
 */
router.post('/signup', AuthController.signup);
router.post('/signin', AuthController.signin);
router.post('/logout', AuthController.logout);

/**
 * GET Route
 */
router.get('/me', AuthMiddleware.checkToken, AuthController.me);

module.exports = router;