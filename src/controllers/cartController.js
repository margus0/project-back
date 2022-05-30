const {
  insertItemIntoCartDb,
  removeItemsFromCartdDb,
  getItemsFromCartDb,
} = require('../models/cartModel');

async function insertItemToCart(req, res) {
  const { id } = req.params;
  const insertResult = await insertItemIntoCartDb(id);

  if (insertResult.code === 'ER_DUP_ENTRY') {
    return res.status(400).send({ err: 'Product allready in cart' });
  }

  if (!insertResult.affectedRows) {
    return res.status(500).send({ err: 'Server issue - please try later' });
  }
  return res.send({ id: insertResult.insertId });
}

async function removeItemsFromCart(req, res) {
  const { id } = req.params;

  const result = await removeItemsFromCartdDb(id);
  if (!result.affectedRows) {
    return res.status(500).send({ err: 'Server issue - please try later' });
  }
  return res.send({ msg: 'Removed successfully', result });
}

async function getItemsFromCart(req, res) {
  const foundResult = await getItemsFromCartDb();
  return res.send({ data: foundResult });
}

module.exports = {
  insertItemToCart,
  removeItemsFromCart,
  getItemsFromCart,
};
