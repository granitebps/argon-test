require('dotenv').config();
const express = require('express');

const router = require('./src/router');

const PORT = process.env.PORT;

const app = express();

app.use(express.static('public/images'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Argon Fullstack Developer Skill Test',
  });
});

app.use(router);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Not found',
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
