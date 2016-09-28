const io = require('socket.io')();
io.on('connection', function(socket) {

  socket.on('createMessage', function(data) {
    socket.emit('postMessage', data);
  });
});

module.exports = io;
