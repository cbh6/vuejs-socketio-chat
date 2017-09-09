var socket = io();

var app = new Vue({
    el: '#chat',
    data: {
        messages: [],
        message: ''
    },
    methods: {
        onSubmit: function(event) {
            event.preventDefault();
        },
        send: function(event) {
            socket.emit('send-msg', this.message);
            this.message = '';
        }
    }
});

socket.on('read-msg', function(data){
    app.messages.push(data);
});

socket.on('user-connected', function(userId) {
    app.messages.push('User ' + userId + ' has been connected');
});