const express = require('express')
const app = express()
const dotenv = require("dotenv")
dotenv.config();


app.get('/', (req, res) => {
  res.send('SuccessFully Running the API of BugBuster')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})