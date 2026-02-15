import { createServer } from 'http';
import { Server } from 'socket.io';

import app from './app.js';
import { connectDB } from './config/db.js';

const port = process.env.PORT || 3000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);
});

async function startServer() {
  try {
    await connectDB();

    server.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Startup failed:', error);
    process.exit(1);
  }
}

startServer();
