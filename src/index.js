require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/', userRouter);

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
