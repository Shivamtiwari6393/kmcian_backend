const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors');
const paperRouter = require("./routes/paperRoute")
const userRoute = require("./routes/userRoute")
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const Logs = require('./middleware/Logs')


dotenv.config();
connectDB();

const app = express()

const corsOptions = {
    exposedHeaders: ["X-Filename"]
};

app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,
    corsOptions
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.text())

app.use(Logs);

app.use('/', paperRouter)
app.use('/api', userRoute);


const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`srever started at port ${PORT}`);
})

