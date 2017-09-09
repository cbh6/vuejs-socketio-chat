var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var dateFormat = require('dateformat');

app.set('port', (process.env.PORT || 3000));
app.use('/npm', express.static('node_modules'));
app.use(express.static('app'));

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
        io.emit('read-msg', { text : message, user : socket.id, date : dateFormat(new Date(), 'shortTime') });
    });

    socket.on('disconnect', function() {
        //io.emit('read-msg', 'User has disconnected.');
        console.log('User ' + socket.id + ' has disconnected');
    });
});