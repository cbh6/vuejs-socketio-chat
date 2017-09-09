(function(){

    var socket = io();

    var app = new Vue({
        el: '#chat',
        data: {
            messages: [],
            message: ''
        },
        methods: {
            // onSubmit: function(event) {
            //     event.preventDefault();
            // },
            send: function() {
                if(this.message){
                    socket.emit('send-msg', this.message);
                    this.message = '';
                }
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
       console.log('User ' + userId + ' has been connected');
    });

})();