const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route')
const multer = require('multer')
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();

const app = express()
const PORT = process.env.PORT || 3001

app.use(multer().any())
app.use(express.json())
app.use(cors())

const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => console.log("MongoDb Connected"))
    .catch((error) => console.log(error))


app.use('/', route)


app.use((req, res) => {
    res.status(404).send({ status: false, message: `Page Not Found , Given URL ${req.url} is incorrect for this application.` })
})

app.listen(PORT, () => console.log("connected to Port 3001"))