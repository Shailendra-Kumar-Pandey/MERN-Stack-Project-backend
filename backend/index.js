 const connectToMongo = require('./db');
 const express = require('express');
 var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Avilable Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// app.get('/', (req, res) => {
//   res.send('Hello Jeetu-Bhai!')
// })

app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})