const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const paperRouter = require('./routes/paperRoute');
const userRoute = require('./routes/userRoute');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const Logs = require('./middleware/Logs');
const http = require('http');
const { Server } = require('socket.io');
const socket = require("./config/socket")

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// setting-up socket

socket(server)

// Middleware


app.use(cors({
    origin: 'http://localhost:5173', // Ensure this matches your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));
app.use(express.text());

app.use(Logs);

// Routes
app.use('/', paperRouter);
app.use('/api', userRoute);

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
