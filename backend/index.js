 const connectToMongo = require('./db');
 const express = require('express');
 var cors = require('cors')

//  connect to mongoDB
connectToMongo();

const app = express()

const port = 5000

// Using Build-In middleware 
app.use(cors())
app.use(express.json())

// Avilable Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})