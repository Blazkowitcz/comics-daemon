const express = require("express");
const router = express.Router();
const VolumeController = require('../controllers/volume.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

/**
 * POST Routes
 */
router.post('/getAllFromCollection', AuthMiddleware.checkToken, VolumeController.getAllFromCollection);
router.post('/open', AuthMiddleware.checkToken, VolumeController.openVolume);
router.post('/markAsRead', AuthMiddleware.checkToken, VolumeController.markAsRead);
router.post('/changePage', AuthMiddleware.checkToken, VolumeController.changePage);

 /**
  * GET Routes
  */

 module.exports = router;