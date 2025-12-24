const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const exercises = [
  { 
    id: 1, 
    name: "Body Scan", 
    instructions: "Release tension by bringing awareness to each part of your body." 
  }
];

app.get('/api/exercises', (req, res) => {
  res.json(exercises);
});

app.listen(5000, () => console.log('Backend running on port 5000'));