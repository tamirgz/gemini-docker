const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/ask', (req, res) => {
  const prompt = req.body.prompt;
  exec(`gemini --prompt "${prompt}"`, (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr);
    res.send({ result: stdout });
  });
});

app.listen(8080, () => console.log('Gemini wrapper API running on port 8080'));