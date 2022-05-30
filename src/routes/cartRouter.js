const express = require('express');
const auth = require('../middleware/auth');
const {
  insertItemToCart,
  removeItemsFromCart,
  getItemsFromCart,
} = require('../controllers/cartController');

const cartRouter = express.Router();

cartRouter.post('/cart/:id', auth, insertItemToCart);
cartRouter.delete('/cart/:id', auth, removeItemsFromCart);
cartRouter.get('/cart', auth, getItemsFromCart);

module.exports = cartRouter;
