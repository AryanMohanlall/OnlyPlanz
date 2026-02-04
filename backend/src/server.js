const express = require('express')
const setTimeout = require('node:timers/promises').setTimeout;
const app = express()
const port = 3000

//Route imports
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

async function spinner(){
  const spinnerChars = ['|', '/', '-', '\\'];
  while(true){
    for( let char of spinnerChars){
      process.stdout.write(`\r${char}`);
      await setTimeout(100);
    }
  }
}

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
  spinner()
});
