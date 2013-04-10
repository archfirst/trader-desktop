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
 * app/framework/Socket
 *
 * This is a singleton object that maintains a socket connection with the server.
 *
 * @author Naresh Bhatia
 */

/*global io:true, window:true */

define(function() {
    'use strict';

    if (!window.io) {
        return false;
    }

    // Module level variables act as singletons
    var _socket = io.connect('http://localhost');

    return _socket;
});