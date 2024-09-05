const { Server } = require('socket.io');
const postChat = require('../controllers/chatController')
const socket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('chatMessage', (msg) => {
            console.log(msg);
            // postChat(msg)
            io.emit('chatMessage', msg);
            console.log("send", msg);
            
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });


}


module.exports = socket