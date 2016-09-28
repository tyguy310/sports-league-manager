/* globals io */
var username = $('#newMessage').data('username');
$(document).on('ready', function() {
  var socket = io();

  $('form').on('submit', function(event) {
    event.preventDefault();
    const id = $('#newMessage').val();
    socket.emit('createMessage', {user: username, message: id});
    $('#newMessage').val('');
  });

  socket.on('createMessage', function(data) {
    socket.emit('postMessage', data);
  });
  socket.on('postMessage', function(data) {
    $('#messages').append(`<li>${username} says: ${data.message}</li>`);
  });

});
