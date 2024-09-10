const express = require('express');
const cors = require('cors');
const paperRouter = require('./routes/paperRoute');
const userRoute = require('./routes/userRoute');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const Logs = require('./middleware/Logs');
const http = require('http');
const socket = require("./config/socket");
const announcementRoute = require('./routes/AnnouncementRoute');
const auth = require('./middleware/auth')

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// setting-up socket

socket(server)


app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));
app.use(express.text());

app.use(Logs);

app.use('/api/user', userRoute);
app.use('/api/paper', paperRouter);
app.use('/api/announcement', announcementRoute)

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
