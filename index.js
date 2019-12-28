const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
	socket.on('joinDBZ', room => {
		socket.join(room);
	});

	console.log('a user connected');
	socket.on('random', msg => {
		console.log('room: ' + msg.room);
		io.to(msg.room).emit('random', msg);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

http.listen(3000, () => {
	console.log('listening on *:3000');
});
