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
 * InstrumentRepository.js
 *
 * @author Naresh Bhatia
 */

/*jshint node:true es5:true */

var _ = require('underscore');

var instruments = [
    {
        'symbol': 'AAPL',
        'name': 'Apple',
        'bid': 112,
        'offer': 110,
        'last': 111
    },
    {
        'symbol': 'MSFT',
        'name': 'Microsoft',
        'bid': 70,
        'offer': 75,
        'last': 78
    },
    {
        'symbol': 'GOOG',
        'name': 'Google',
        'bid': 98,
        'offer': 102,
        'last': 101
    },
    {
        'symbol': 'NOK',
        'name': 'Nokia',
        'bid': 8,
        'offer': 9,
        'last': 10
    },
    {
        'symbol': 'SMSN',
        'name': 'Samsung',
        'bid': 86,
        'offer': 90,
        'last': 89
    },
    {
        'symbol': 'INTC',
        'name': 'Intel Corporation',
        'bid': 112,
        'offer': 110,
        'last': 111
    }
];

exports.getAll = function() {
    'use strict';
    return instruments;
};

exports.get = function(symbol) {
    'use strict';
    _.where(instruments, {symbol : symbol});
};