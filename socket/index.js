require("dotenv").config();


const io = require("socket.io")(process.env.PORT || 5000, {
    cors: {
        origin: "http://localhost:3000"
    }
});



io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('addComment', (data) => {
        const { postId, newComment } = data;
        io.emit('commentAdded', { postId, newComment });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

console.log("The socket server is running");