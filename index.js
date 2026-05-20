const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/', (req, res) => res.send('ScribeMind backend is running!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));

// Keep alive ping every 14 minutes
setInterval(() => {
  fetch('https://scribemind-backend.onrender.com/')
    .then(() => console.log('Kept alive'))
    .catch(() => console.log('Ping failed'));
}, 14 * 60 * 1000);
