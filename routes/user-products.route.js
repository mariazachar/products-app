const express = require('express');
const router = express.Router(); // θα φερεις ολες τις ιδιοότητες της express που αφορουν το router

const userProductController = require('../controllers/user-products.controller');

router.get('/', userProductController.findAll);
router.get('/stats1', userProductController.stats1);
router.get('/:username', userProductController.findOne);
router.post('/', userProductController.addProduct);
router.patch('/:username', userProductController.updateProduct);
router.delete('/:username/products/:product', userProductController.deleteProduct);


module.exports = router;