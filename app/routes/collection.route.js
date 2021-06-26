const express = require("express");
const router = express.Router();
const CollectionController = require('../controllers/collection.controller');

/**
 * POST Routes
 */
router.post('/create', CollectionController.create);
router.post('/delete', CollectionController.delete);
router.post('/scan', CollectionController.scanCollection);

/**
 * GET Routes
 */
router.post('/getAllFromLibrary', CollectionController.getAllFromLibrary);

module.exports = router;