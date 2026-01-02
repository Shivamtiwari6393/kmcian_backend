const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const paperRouter = require('./routes/paperRoute');
const userRoute = require('./routes/userRoute');
const connectDB = require('./config/db');
const Logs = require('./middleware/Logs');
const http = require('http');
const announcementRoute = require('./routes/AnnouncementRoute');
const queryRoute = require('./routes/queryRoute')
const requestRoute = require('./routes/requestRoute')
const replyRoute = require('./routes/replyRoute')
const commentRoute = require('./routes/commentRoute');
const newPaperInfoRouter = require('./routes/newPaperInfoRouter');
const cookieParser = require('cookie-parser');
const videoRoute = require('./routes/videoRoute')
const flagRoute = require('./routes/flagRoute')


dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: ["https://kmcian.netlify.app", "https://kmcian.vercel.app","http://localhost:5173"],
    methods: 'GET,HEAD,PUT,POST,DELETE',
    credentials: true,
}));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));
app.use(express.text());
app.use(Logs);

app.get("/", (req, res) => {
    res.json({ message: "This is Kmcian Backend" })
})
app.use('/api/user', userRoute);
app.use('/api/paper', paperRouter);
app.use('/api/announcement', announcementRoute)
app.use('/api/query', queryRoute)
app.use("/api/reply", replyRoute)
app.use("/api/request", requestRoute)
app.use("/api/comment", commentRoute)
app.use("/api/newPaperInfo", newPaperInfoRouter)
app.use('/api/flag', flagRoute)
app.use('/api/shorts', videoRoute)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
