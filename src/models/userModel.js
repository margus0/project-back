const mysql = require('mysql2/promise');
const dbConfig = require('../configs');

async function insertNewUserToDb(email, password) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO users (email, password)
    VALUES (?, ?);`;
    const [insertResult] = await conn.execute(sql, [email, password]);
    await conn.close();
    return insertResult;
  } catch (error) {
    return error;
  }
}

async function findUserInDb(email) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT * FROM users WHERE email = ?`;
    const [foundResult] = await conn.execute(sql, [email]);
    await conn.close();
    return foundResult;
  } catch (error) {
    return error;
  }
}

module.exports = {
  insertNewUserToDb,
  findUserInDb,
};
