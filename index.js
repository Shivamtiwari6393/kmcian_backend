const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const app = express()
const paperRouter = require("./routes/paperRoute")
const userRoute = require("./routes/userRoute")



const PORT = 8000

mongoose.connect('mongodb://localhost:27017/paper', {
}).then(() => console.log('Connected to MongoDB')).catch((err) => console.error('Failed to connect to MongoDB', err));



const corsOptions = {
    exposedHeaders: ['X-Paper'], // Specify the headers you want to expose
};
app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb',extended: true }));
app.use(express.text())

app.use('/', paperRouter)
app.use('/api', userRoute);


app.listen(PORT, () => {
    console.log(`srever started at port ${PORT}`);
})