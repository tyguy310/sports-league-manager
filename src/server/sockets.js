var io = require('socket.io').listen(80);

io.sockets.on('connection', function (socket) {

socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

// const io = require('socket.io')();
// io.on('connection', function(socket) {
//
//   socket.on('createMessage', function(data) {
//     socket.emit('postMessage', data);
//   });
// });

module.exports = io;
//http://stackoverflow.com/questions/10738073/socket-io-phonegap/10886574#10886574
