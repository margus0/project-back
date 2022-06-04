const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configs');
const { insertNewUserToDb, findUserInDb } = require('../models/userModel');

async function createNewUser(req, res) {
  const { email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const insertResult = await insertNewUserToDb(email, hashPassword);

  if (insertResult.code === 'ER_DUP_ENTRY') {
    return res.status(400).send({
      err: `Duplicate entry ${email} for key 'email'`,
    });
  }
  if (!insertResult.insertId) {
    return res.status(500).send({ err: 'Server issue - please try again' });
  }
  return res.send({
    msg: 'Registration successful',
    userId: insertResult.insertId,
  });
}

async function findUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ err: 'Email or password is missing' });
  }
  const foundData = await findUserInDb(email);
  console.log('foundData ===', foundData);
  if (!foundData) {
    return res.status(400).send({ err: 'Incorrect password or email' });
  }
  const checkPassword = bcrypt.compareSync(password, foundData[0].password);
  if (!checkPassword) {
    return res.status(400).send({ err: 'Incorrect password or email' });
  }
  const token = jwt.sign({ userId: foundData[0].id }, jwtSecret, {
    expiresIn: '1h',
  });
  return res.send({ msg: 'Login successful', token });
}

module.exports = {
  createNewUser,
  findUser,
};
