const mysql = require('mysql2/promise');
const { dbConfig } = require('../configs');

async function insertItemIntoCartDb(id) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO cart (id, name, price, image)
    SELECT id, name, price, img
    FROM items
    WHERE id = ?
    LIMIT 1`;
    const [data] = await conn.execute(sql, [id]);
    await conn.close();
    return data;
  } catch (error) {
    return error;
  }
}

async function removeItemsFromCartdDb(id) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    DELETE FROM cart
    WHERE id = ?
    LIMIT 1`;
    const [data] = await conn.execute(sql, [id]);
    await conn.close();
    return data;
  } catch (error) {
    return error;
  }
}

async function getItemsFromCartDb() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT * FROM cart`;
    const [data] = await conn.execute(sql);
    await conn.close();
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = {
  insertItemIntoCartDb,
  removeItemsFromCartdDb,
  getItemsFromCartDb,
};
