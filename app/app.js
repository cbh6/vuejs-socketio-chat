(function(){

    var socket = io();

    var app = new Vue({
        el: '#chat',
        data: {
            messages: [],
            users: [],
            username: '',
            isLogged: false,
            message: ''
        },
        methods: {
            // onSubmit: function(event) {
            //     event.preventDefault();
            // },
            send: function() {
                if(this.message){
                    socket.emit('send-msg', {message: this.message, user: this.username});
                    this.message = '';
                }
            },
            sendUserName: function() {
                this.isLogged = true;
                socket.emit('add-user', this.username);
            },
            scrollToEnd: function() {       
                var container = this.$el.querySelector("#messages");
                container.scrollTop = container.scrollHeight;
            },
        },
        updated(){
            this.scrollToEnd();
        }
    });

    socket.on('read-msg', function(message){
        app.messages.push({text : message.text, user : message.user, date : message.date});
    });

    socket.on('user-connected', function(userId) {
       // app.messages.push('User ' + userId + ' has been connected');
       app.users.push(userId);
    });

    socket.on('init-chat', function(messages){
        app.messages = messages;
    });
    socket.on('update-users', function(users){
        app.users = users;
    });

})();