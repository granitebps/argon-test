require('dotenv').config();
const express = require('express');
const router = require('./src/router');

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Argon Fullstack Developer Skill Test',
  });
});

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
