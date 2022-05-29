const express = require('express');
const auth = require('../middleware/auth');
const {
  insertItemToCart,
  removeItemsFromCart,
} = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.post('/cart/:id', auth, insertItemToCart);
cartRouter.delete('/cart', auth, removeItemsFromCart);

module.exports = cartRouter;
