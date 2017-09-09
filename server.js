var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 3000));
app.use('/npm', express.static('node_modules'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/app/index.html');
});

server.listen(3000, function() {
  console.log('Node app is running on port 3000');
});


io.on('connection', function(socket) {

	console.log('User connected:', socket.id);

	socket.broadcast.emit('user-connected', socket.id);

    socket.on('send-msg', function(message) {
        io.emit('read-msg', message);
    });

    socket.on('disconnect', function() {
        io.emit('read-msg', 'User has disconnected.');
    });
});