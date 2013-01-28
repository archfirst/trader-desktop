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
 * OrderRepository.js
 *
 * @author Naresh Bhatia
 */
var nextId = 1;

var orders = [];

exports.persist = function(order) {
    order.id = nextId++;
    order.creationTime = new Date();
    order.quantityPlaced = 0;
    order.quantityExecuted = 0;
    order.priority = 50;
    order.status = 'New';
    order.alerts = [];
    orders.push(order);
};

exports.getAll = function() {
    return orders;
};

exports.find = function(properties) {
    _.where(orders, properties);
};

exports.cancel = function(id) {
    var matchedOrders = _.where(orders, {id: id});
    if (matchedOrders.length === 1) {
        matchedOrders[0].status = 'Canceled';
    }
};

exports.deleteAll = function() {
    orders.length = 0;
};