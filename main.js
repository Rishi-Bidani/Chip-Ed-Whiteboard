const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http, { path: '/myapp/socket.io'});

// Local PostgreSQL database connection =================
const knex = require('knex')({
	client: 'pg',
	version: '13',
	connection: {
		host: 'localhost',
		user: 'postgres',
		password: 'r123',
		database: 'first'
	}
});


// Setup the main webpage index.html
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});


// Connecting sockets
io
.of('/firstNameSpace')
.on('connection', function(socket){
	console.log('a user connected with id %s', socket.id);
	socket.on('hello', (msg) => {
		console.log(msg);
		socket.broadcast.emit("datareturns", msg);
	})

});
// FInish sockets


http.listen(process.env.PORT || 3000, () => {
	console.log('listening on port');
});