var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/home', function(req, res){
  res.sendFile(__dirname + '/home.html');
});

app.get('/pageone', function(req, res) {
  res.render('pageone.ejs');
});



io.sockets.on('connection', function(socket) {
  socket.on('username', function(username) {
    socket.username = username;


    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });                

    io.emit('is_online', socket.username + ' join the chat..</i>');

  })
})

http.listen(process.env.PORT || 3000 , function(){
  console.log('listening on *:3000');
});