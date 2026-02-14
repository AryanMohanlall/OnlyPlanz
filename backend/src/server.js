import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import { connectDB } from './config/db.js';

import userRoutes from './routes/user.routes.js';

app.use(express.json());

// Connect to MongoDB
await connectDB();

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);

});
