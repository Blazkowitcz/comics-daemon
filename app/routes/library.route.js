const express = require("express");
const router = express.Router();
const LibraryController = require('../controllers/library.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

/**
 * POST Routes
 */
 router.post('/create', LibraryController.create);
 router.post('/delete', LibraryController.delete);
 router.post('/update', LibraryController.update);
 router.post('/scan', LibraryController.scanLibrary);

 /**
  * GET Routes
  */
 router.get('/getAll', AuthMiddleware.checkToken, LibraryController.getAll);

 module.exports = router;