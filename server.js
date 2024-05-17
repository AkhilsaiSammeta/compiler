const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/compile', (req, res) => {
  const code = req.body.code;
  const language = req.body.language;
  const input = req.body.input;

  // Call the compiler API
  axios.post(`https://codexweb.netlify.app/.netlify/functions/enforceCode`, {
    code,
    language,
    input,
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ error: 'Failed to compile' });
    });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});