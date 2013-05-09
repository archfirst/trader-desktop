/**
 * Copyright 2012 Archfirst
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
 * app/domain/Repository
 *
 * This is a singleton object that maintains the domain layer of the application.
 * Domain objects in this layer generally live beyond the life of views in the
 * presentation layer. When views are created, they are generally connected to
 * domain objects that are already present in this repository.
 *
 * @author Naresh Bhatia
 */

/*jshint devel:true */

define(
    [
        'backbone',
        'app/framework/Socket'
    ],
    function(Backbone, Socket) {
        'use strict';

        // Module level variables act as singletons
        var _users = new Backbone.Collection();
        var _instruments = new Backbone.Collection();
        var _orders = new Backbone.Collection();

        var _loggedInUser = null;

        _users.url = '/rest/users';
        _instruments.url = '/rest/instruments';
        _orders.url = '/rest/orders';

        var _repository = {
            getUsers: function() { return _users; },
            getInstruments: function() { return _instruments; },
            getOrders: function() { return _orders; },
            getloggedInUser: function() { return _loggedInUser; },

            getUser: function(id) {
                var matchedUsers = _users.where({id : id});
                return (matchedUsers.length === 1) ? matchedUsers[0] : null;
            },

            setloggedInUser: function(userId) {
                _loggedInUser = _repository.getUser(userId);
            },

            fetchOrders: function() {
                _orders.fetch({reset: true});
            }
        };

        _users.fetch();
        _instruments.fetch();
        _orders.fetch();

        Socket.on('orderCreatedEvent', function(order) {
            console.log(order);
        });

        Socket.on('placementCreatedEvent', function(placement) {
            console.log(placement);
        });

        Socket.on('executionCreatedEvent', function(execution) {
            console.log(execution);
        });

        Socket.on('allOrdersDeletedEvent', function() {
            console.log('allOrdersDeletedEvent');
        });

        return _repository;
    }
);