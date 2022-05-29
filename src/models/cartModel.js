const mysql = require('mysql2/promise');
const { dbConfig } = require('../configs');

async function insertItemIntoCartDb(id) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [data] = await conn.execute(`
    INSERT INTO cart (id, name, price, image)
    SELECT id, name, price, img
    FROM items
    WHERE id = (${mysql.escape(id)})
    LIMIT 1`);
    await conn.close();
    console.log('data ===', data);
    return data;
  } catch (error) {
    console.log('error ===', error);
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
    console.log('data ===', data);
    return data;
  } catch (error) {
    console.log('error ===', error);
    return error;
  }
}

module.exports = {
  insertItemIntoCartDb,
  removeItemsFromCartdDb,
};
