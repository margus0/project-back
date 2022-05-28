const express = require('express');
const { getCategories, getItems } = require('../controllers/productController');
const auth = require('../middleware/auth');

const productRouter = express.Router();

productRouter.get('/categories', auth, getCategories);
productRouter.get('/items', auth, getItems);

module.exports = productRouter;
