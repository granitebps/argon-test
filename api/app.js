require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Argon Fullstack Developer Skill Test',
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
