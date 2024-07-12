const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const apiRoutes = require('./routers/apiRouter')
require('dotenv').config()

// Create express app
const app = express()


// Connection URI for your MongoDB database
const mongoURI = process.env.MONGO_URI

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Get the default connection
const db = mongoose.connection

// Accept requests from only the provided URL
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(express.json())

app.use('/api', apiRoutes)

app.listen(3001, () => {
    console.log("Listening on port 3001")
})