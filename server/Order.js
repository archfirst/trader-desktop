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

/*jshint node:true */

var socketUtil = require('./SocketUtil.js');
var instrumentRepository = require('./InstrumentRepository.js');

var nextId = 1;
var maxPlacementInterval = 4; // in seconds
var maxExecutionInterval = 4; // in seconds
var maxPriceSpread = 10;      // in percentage

// Returns a random integer between min and max
// Using Math.round() will give you a non-uniform distribution!
// Based on: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random
var getRandomInt = function(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

    this.computeNextPlacementTime();  // in milliseconds
    this.computeNextExecutionTime();  // in milliseconds
};

// Properties and methods
Order.prototype = {
    computeNextPlacementTime: function() {
        'use strict';
        var waitTime = getRandomInt(1, maxPlacementInterval * 1000);
        this._nextPlacementTime = new Date().getTime() + waitTime;
    },

    computeNextExecutionTime: function() {
        'use strict';
        var waitTime = getRandomInt(1, maxExecutionInterval * 1000);
        this._nextExecutionTime = new Date().getTime() + waitTime;
    },

    processTick: function() {
        'use strict';

        var status = this.status;

        if (status === 'Executed' || status === 'Canceled') {
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

            // Compute a random quantity to place (max 25%)
            var quantityToPlace = getRandomInt(1, 0.25 * this.quantity);

            // What's the maximum we can place based on the quantity that remains to be placed
            var maxQuantityToPlace = this.quantity - this.quantityPlaced;
            if (quantityToPlace > maxQuantityToPlace) {
                quantityToPlace = maxQuantityToPlace;
            }

            if (quantityToPlace <= 0) {
                return;
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
                quantityPlaced: quantityToPlace,
                status: this.status
            });
        }
    },

    tryExecuting: function() {
        'use strict';

        var now = new Date().getTime();
        if (now >= this._nextExecutionTime) {

            // Compute a random quantity to execute (max 25%)
            var quantityToExecute = getRandomInt(1, 0.25 * this.quantity);

            // What's the maximum we can execute based on what has been placed
            var maxQuantityToExecute = this.quantityPlaced - this.quantityExecuted;
            if (quantityToExecute >  maxQuantityToExecute) {
                quantityToExecute = maxQuantityToExecute;
            }

            // What's the maximum we can execute based on the quantity that remains to be executed
            maxQuantityToExecute = this.quantity - this.quantityExecuted;
            if (quantityToExecute >  maxQuantityToExecute) {
                quantityToExecute = maxQuantityToExecute;
            }

            if (quantityToExecute <= 0) {
                return;
            }

            // Do the execution
            this.quantityExecuted += quantityToExecute;

            // Calculate the execution price
            var maxPriceChange = this.limitPrice * (maxPriceSpread/100);
            // e.g. assume limit price = $110
            // maxPriceChange = $110 % .1 = $11.00

            var actualPriceChange = maxPriceChange * Math.random();
            actualPriceChange = (Math.round(actualPriceChange * 100))/100; // round to 2 digits
            // Assume Math.random() returns .4
            // e.g. actualPriceChange = $11.00 * 0.4 = $4.40

            var executionPrice = (this.side === 'Buy') ?
                this.limitPrice - actualPriceChange :
                this.limitPrice + actualPriceChange;
            // e.g. buy execution price =  $110 - $4.40 = $105.60
            //      sell execution price = $110 + $4.40 = $114.60

            // Save the execution price in the repository
            var instruments = instrumentRepository.get(this.symbol);
            if (instruments.length === 1) {
                instruments[0].lastTrade = executionPrice;
            }

            // Check if fully executed
            if (this.quantityExecuted === this.quantity) {
                this.status = 'Executed';
            }
            else {
                // Reinitialize next execution time
                this.computeNextExecutionTime();
            }

            // Broadcast the execution
            socketUtil.broadcast('executionCreatedEvent', {
                orderId: this.id,
                quantityExecuted: quantityToExecute,
                executionPrice: executionPrice,
                status: this.status
            });
        }
    }
};

// Export the class
module.exports = Order;