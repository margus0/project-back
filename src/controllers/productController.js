const { getItemsFromDb } = require('../models/productsModel');

async function getItems(req, res) {
  const foundData = await getItemsFromDb();
  if (!foundData) {
    return res.status(500).send({
      err: 'Server issue please try later',
    });
  }

  return res.status(200).send({ data: foundData });
}

module.exports = { getItems };
