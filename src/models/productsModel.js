const mysql = require('mysql2/promise');
const { dbConfig } = require('../configs');

async function getCatFromDb() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT category FROM items`;
    const [data] = await conn.query(sql);
    await conn.close();
    console.log('data ===', data);
    return data;
  } catch (error) {
    console.log('error ===', error);
    return error;
  }
}

async function getItemsFromDb() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT * FROM items`;
    const [data] = await conn.query(sql);
    await conn.close();
    console.log('data ===', data);
    return data;
  } catch (error) {
    console.log('error ===', error);
    return error;
  }
}

module.exports = { getCatFromDb, getItemsFromDb };
