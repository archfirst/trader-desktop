/**
 * Copyright 2013 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * server.js
 *
 * @author Naresh Bhatia
 */

/*jshint node:true es5:true */

var express         = require('express'),
    app             = express(),
    server          = require('http').createServer(app),
    io              = require('socket.io').listen(server),
    orderRepository = require('./OrderRepository.js');

// -----------------------------------------------------------------------------
// Web Server Setup
// -----------------------------------------------------------------------------

// Any HTTP request will be satisfied using the content under './client'
app.use(express.static('./client'));

// Add middleware to parse the POST data of the body
app.use(express.bodyParser());

// Start listening on port 8080
server.listen(8080);
console.log('Listening on port 8080');


// -----------------------------------------------------------------------------
// Socket.io Setup
// -----------------------------------------------------------------------------

io.set('log level', 1);

// Set up connection handling
io.sockets.on('connection', function(socket) {
    'use strict';
    console.log(socket.id + ' connected');

    socket.broadcast.emit('message', socket.id + ' connected');

    socket.on('disconnect', function() {
        console.log(socket.id + ' disconnected');
        socket.broadcast.emit('message', socket.id + ' disconnected');
    });
});

// -----------------------------------------------------------------------------
// RESTful Service Setup
// -----------------------------------------------------------------------------

// Order object:
//  id: int
//  creationTime: date,
//  side: 'Buy' | 'Sell'
//  symbol: String
//  quantity: int
//  quantityPlaced: int
//  quantityExecuted: int
//  limitPrice: float
//  status: 'New' | 'Placed' | 'Filled' | 'Canceled'
//  traderId: String
//  alerts: []

// Create order
// Expects an order in the request body with the following properties filled:
// {
//   "side": "Buy" | "Sell",
//   "symbol": String,
//   "quantity": int,
//   "limitPrice": float,
//   "traderId": String
// }
app.post('/rest/orders', function (req, res) {
    'use strict';
    var order = req.body;
    orderRepository.persist(order);
    res.status(201);
    res.setHeader('Content-Type', 'application/json');
    return res.send(order);
});

// Get all orders
app.get('/rest/orders', function (req, res) {
    'use strict';
    res.setHeader('Content-Type', 'application/json');
    return res.send(orderRepository.getAll());
});