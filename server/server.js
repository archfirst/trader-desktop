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

/*jshint node:true */

var _                    = require('underscore'),
    express              = require('express'),
    app                  = express(),
    server               = require('http').createServer(app),
    io                   = require('socket.io').listen(server),
    socketUtil           = require('./SocketUtil.js'),
    userRepository      = require('./UserRepository.js'),
    instrumentRepository = require('./InstrumentRepository.js'),
    orderRepository      = require('./OrderRepository.js');

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

// Log socket connections and disconnections
io.sockets.on('connection', function(socket) {
    'use strict';
    console.log(socket.id + ' connected');

    socket.on('disconnect', function() {
        console.log(socket.id + ' disconnected');
    });
});

socketUtil.init(io);

// -----------------------------------------------------------------------------
// RESTful Service Setup
// -----------------------------------------------------------------------------

// ----- User -----
// id: String
// name: String

// Get all users
app.get('/rest/users', function (req, res) {
    'use strict';
    res.setHeader('Content-Type', 'application/json');
    return res.send(userRepository.getAll());
});

// ----- Instrument -----
// symbol: String
// name: String
// lastTrade: float

// Get all instruments
app.get('/rest/instruments', function (req, res) {
    'use strict';
    res.setHeader('Content-Type', 'application/json');
    return res.send(instrumentRepository.getAll());
});

// ----- Order -----
// id: int
// creationTime: date,
// side: 'Buy' | 'Sell'
// symbol: String
// quantity: int
// quantityPlaced: int
// quantityExecuted: int
// limitPrice: float
// priority: int  [1 (Low) - 100 (High)]
// status: 'New' | 'Placed' | 'Filled' | 'Canceled'
// traderId: String

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
    var orderParams = req.body;
    var order = orderRepository.persist(orderParams);

    // Broadcast order to clients
    socketUtil.broadcast('orderCreatedEvent', order);

    // Send response to caller
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

// Delete all orders
app.del('/rest/orders', function (req, res) {
    'use strict';
    orderRepository.deleteAll();

    // Broadcast deleted eveent to clients
    socketUtil.broadcast('allOrdersDeletedEvent');

    // Send response to caller
    res.setHeader('Content-Type', 'application/json');
    return res.send(200);
});

// -----------------------------------------------------------------------------
// Catchall to route all other requests to index.html
// -----------------------------------------------------------------------------

app.get('*', function(req, res) {
    'use strict';
    res.sendfile('./client/index.html');
});

// -----------------------------------------------------------------------------
// Periodic Order Processing
// -----------------------------------------------------------------------------
setInterval(function() {
    'use strict';

    var orders = orderRepository.getAll();
    _.each(orders, function(order) {
        order.processTick();
    });
}, 2000);