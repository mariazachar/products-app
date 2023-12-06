const express = require('express');
const router = express.Router();

const productContoller = require('../controllers/products.controller');

router.get('/', productContoller.findAll);
router.get('/:_id', productContoller.findOne);
router.post('/', productContoller.create);
router.patch('/:_id', productContoller.update);
router.delete('/:_id', productContoller.delete);

module.exports = router;
