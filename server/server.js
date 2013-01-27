/*jshint node:true es5:true */

var express = require('express'),
    app     = express(),
    server  = require('http').createServer(app),
    io      = require('socket.io').listen(server);

io.set('log level', 1);

app.use(express.static('./client'));

server.listen(8080);
console.log('Listening on port 8080');

io.sockets.on('connection', function(socket) {
    'use strict';
    console.log(socket.id + ' connected');

    socket.broadcast.emit('message', socket.id + ' connected');

    socket.on('disconnect', function() {
        console.log(socket.id + ' disconnected');
        socket.broadcast.emit('message', socket.id + ' disconnected');
    });
});