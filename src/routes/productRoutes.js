const express = require('express');
const { getItems } = require('../controllers/productController');
const auth = require('../middleware/auth');

const productRouter = express.Router();

productRouter.get('/items', auth, getItems);

module.exports = productRouter;
