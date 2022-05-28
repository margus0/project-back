const { getCatFromDb, getItemsFromDb } = require('../models/productsModel');

async function getCategories(req, res) {
  const foundData = await getCatFromDb();

  if (!foundData) {
    return res.status(500).send({
      err: 'Server issue please try later',
    });
  }

  return res.send({ data: foundData });
}

async function getItems(req, res) {
  const foundData = await getItemsFromDb();
  console.log('foundData ===', foundData);
  if (!foundData) {
    return res.status(500).send({
      err: 'Server issue please try later',
    });
  }

  return res.send({ data: foundData });
}

module.exports = { getCategories, getItems };
