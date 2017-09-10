var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var dateFormat = require('dateformat');
var favicon = require('serve-favicon');

app.set('port', (process.env.PORT || 3000));
app.use(favicon(__dirname + '/app/images/favicon.ico'));
app.use('/npm', express.static('node_modules'));
app.use(express.static('app'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/app/index.html');
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port ', app.get('port'));
});

var messages = [];
var users = [];

io.on('connection', function(socket) {

    //users.push(socket.id);

    socket.emit('init-chat', messages);
    socket.emit('update-users', users);

    socket.on('send-msg', function(data) {
        var newMessage = { text : data.message, user : data.user, date : dateFormat(new Date(), 'shortTime') };
        messages.push(newMessage);
        io.emit('read-msg', newMessage);
    });

    socket.on('add-user', function(user){
        users.push({ id: socket.id, name: user });
        io.emit('update-users', users);
    });

    socket.on('disconnect', function() {
        users = users.filter(function(user){
            return user.id != socket.id;
        });
        io.emit('update-users', users);
    });
});