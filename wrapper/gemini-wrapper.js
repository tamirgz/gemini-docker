const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/ask', (req, res) => {
  const prompt = req.body.prompt;
  const apiKey = process.env.GEMINI_API_KEY;

  console.log(`[INFO] /ask called with prompt: ${prompt}`);
  if (!apiKey) {
    console.warn("[WARN] GEMINI_API_KEY is not set!");
  }

  const command = `gemini --prompt "${prompt}"`;
  console.log(`[INFO] Executing: ${command}`);

  exec(command, { env: { ...process.env, GEMINI_API_KEY: apiKey } }, (err, stdout, stderr) => {
    if (err) {
      console.error(`[ERROR] Gemini CLI error: ${stderr}`);
      return res.status(500).send(stderr);
    }

    console.log(`[INFO] Gemini CLI response: ${stdout?.substring(0, 100)}...`);
    res.send({ result: stdout });
  });
});

app.listen(8080, () => console.log('Gemini wrapper API running on port 8080'));
