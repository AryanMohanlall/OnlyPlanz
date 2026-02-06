const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { connectDB } = require('./db');

// Route imports
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

// Connect to MongoDB
connectDB();

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
