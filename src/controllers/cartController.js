const {
  insertItemIntoCartDb,
  removeItemsFromCartdDb,
} = require('../models/cartModel');

async function insertItemToCart(req, res) {
  const { id } = req.params;

  if (['string', null, undefined].includes === id) {
    return res.status(400).send({ err: 'Bad id' });
  }
  const insertResult = await insertItemIntoCartDb(id);

  if (!insertResult.affectedRows) {
    return res.status(500).send({ err: 'Server issue - please try later' });
  }
  return res.send({ insertResult });
}

async function removeItemsFromCart(req, res) {
  const { id } = req.body;
  const result = await removeItemsFromCartdDb(id);
  if (!result.affectedRows) {
    return res.status(500).send({ err: 'Server issue - please try later' });
  }
  return res.send({ msg: 'Removed successfully', result });
}

module.exports = {
  insertItemToCart,
  removeItemsFromCart,
};
