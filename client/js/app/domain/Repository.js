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
 * This is a singleton object that maintains the context of the logged in user.
 * The context consists of the following:
 *   user: User
 *   credentials: Credentials
 *
 * @author Naresh Bhatia
 */

/*jshint devel:true */

define(
    [
        'framework/Socket'
    ],
    function(Socket) {
        'use strict';

        // Module level variables act as singletons
        // --- Module level variables go here ---

        var _repository = {
        };

        Socket.on('orderCreatedEvent', function(order) {
            console.log(order);
        });

        return _repository;
    }
);