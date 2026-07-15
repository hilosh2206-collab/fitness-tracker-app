const express = require('express');
const app = express();

app.get('/api/joke', async (req, res) => {
  try {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const joke = await response.json();
    res.json({ setup: joke.setup, punchline: joke.punchline });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});