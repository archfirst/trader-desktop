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
 * Order.js
 *
 * @author Naresh Bhatia
 */

/*jshint node:true es5:true */

var socketUtil = require('./SocketUtil.js');

var nextId = 1;
var maxPlacementInterval = 2; // in seconds
var maxExecutionInterval = 2; // in seconds
//var maxPriceSpread = 10;       // in percentage

// Constructor
var Order = function(orderParams) {
    'use strict';

    this.id = nextId++;
    this.creationTime = new Date();
    this.side = orderParams.side;
    this.symbol = orderParams.symbol;
    this.quantity = orderParams.quantity;
    this.quantityPlaced = 0;
    this.quantityExecuted = 0;
    this.limitPrice = orderParams.limitPrice;
    this.priority = 50;
    this.status = 'New';
    this.traderId = orderParams.traderId;
    this.alerts = [];

    this.computeNextPlacementTime();  // in milliseconds
    this.computeNextExecutionTime();  // in milliseconds
};

// Properties and methods
Order.prototype = {
    computeNextPlacementTime: function() {
        'use strict';
        var waitTime = Math.round(Math.random() * maxPlacementInterval * 1000);
        this._nextPlacementTime = new Date().getTime() + waitTime;
    },

    computeNextExecutionTime: function() {
        'use strict';
        var waitTime = Math.round(Math.random() * maxExecutionInterval * 1000);
        this._nextExecutionTime = new Date().getTime() + waitTime;
    },

    processTick: function() {
        'use strict';

        var status = this.status;

        if (status === 'Filled' || status === 'Canceled') {
            return;
        }

        if (status === 'Placed') {
            this.tryExecuting();
        }
        else {  // status = 'New'
            this.tryPlacing();
            this.tryExecuting();
        }
    },

    tryPlacing: function() {
        'use strict';

        var now = new Date().getTime();
        if (now >= this._nextPlacementTime) {

            // Compute a random quantity to place (max 10%)
            var quantityToPlace = Math.round(Math.random() * 0.1 * this.quantity);

            // Make sure we do not place more than needed
            var maxQuantityToPlace = this.quantity - this.quantityPlaced;
            if (quantityToPlace >  maxQuantityToPlace) {
                quantityToPlace = maxQuantityToPlace;
            }

            // Do the placement
            this.quantityPlaced += quantityToPlace;

            // Check if fully placed
            if (this.quantityPlaced === this.quantity) {
                this.status = 'Placed';
            }
            else {
                // Reinitialize next placement time
                this.computeNextPlacementTime();
            }

            // Broadcast the placement
            socketUtil.broadcast('placementCreatedEvent', {
                orderId: this.id,
                quantity: quantityToPlace,
                orderStatus: this.status});
        }
    },

    tryExecuting: function() {
        'use strict';

    }
};

// Export the class
module.exports = Order;