 const connectToMongo = require('./db');
 const express = require('express');

 connectToMongo();

const app = express()
const port = 3000

// Avilable Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello Jeetu-Bhai!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})