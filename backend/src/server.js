import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import { testSave } from './test.js';

// Route imports
import userRoutes from './routes/userRoutes.js';

app.use(express.json());

// Connect to MongoDB
//connectDB();

testSave();

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);

});
