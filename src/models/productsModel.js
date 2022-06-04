const mysql = require('mysql2/promise');
const { dbConfig } = require('../configs');

async function getItemsFromDb() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT * FROM items`;
    const [data] = await conn.execute(sql);
    await conn.close();
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = { getItemsFromDb };
