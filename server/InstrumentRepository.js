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

/*jshint node:true */

var _ = require('underscore');

var instruments = [
    {
        'symbol': 'AAPL',
        'name': 'Apple Inc.',
        'lastTrade': 700.23
    },
    {
        'symbol': 'ADBE',
        'name': 'Adobe Systems Inc.',
        'lastTrade': 33.49
    },
    {
        'symbol': 'AKAM',
        'name': 'Akamai Technologies Inc.',
        'lastTrade': 38.33
    },
    {
        'symbol': 'AMD',
        'name': 'Advanced Micro Devices Inc.',
        'lastTrade': 3.49
    },
    {
        'symbol': 'AMZN',
        'name': 'Amazon.com Inc.',
        'lastTrade': 255.12
    },
    {
        'symbol': 'BA',
        'name': 'The Boeing Company',
        'lastTrade': 69.53
    },
    {
        'symbol': 'BAC',
        'name': 'Bank of America Corporation',
        'lastTrade': 9.10
    },
    {
        'symbol': 'CCE',
        'name': 'Coca-Cola Enterprises Inc.',
        'lastTrade': 31.22
    },
    {
        'symbol': 'CL',
        'name': 'Colgate-Palmolive Company',
        'lastTrade': 106.79
    },
    {
        'symbol': 'CSCO',
        'name': 'Cisco Systems, Inc.',
        'lastTrade': 60
    },
    {
        'symbol': 'DELL',
        'name': 'Dell Inc.',
        'lastTrade': 10.14
    },
    {
        'symbol': 'DIS',
        'name': 'The Walt Disney Company',
        'lastTrade': 52.81
    },
    {
        'symbol': 'DOW',
        'name': 'The Dow Chemical Company',
        'lastTrade': 30.20
    },
    {
        'symbol': 'DWA',
        'name': 'Dreamworks Animation Skg Inc',
        'lastTrade': 17.72
    },
    {
        'symbol': 'EA',
        'name': 'Electronic Arts Inc.',
        'lastTrade': 13.27
    },
    {
        'symbol': 'EBAY',
        'name': 'eBay Inc.',
        'lastTrade': 49.27
    },
    {
        'symbol': 'EMC',
        'name': 'EMC Corporation',
        'lastTrade': 27.74
    },
    {
        'symbol': 'EMN',
        'name': 'Eastman Chemical Company',
        'lastTrade': 56.37
    },
    {
        'symbol': 'CVX',
        'name': 'Chevron Corporation',
        'lastTrade': 118.01
    },
    {
        'symbol': 'GE',
        'name': 'General Electric',
        'lastTrade': 22.53
    },
    {
        'symbol': 'GOOG',
        'name': 'Google Inc.',
        'lastTrade': 55
    },
    {
        'symbol': 'GS',
        'name': 'Goldman Sachs Group Inc.',
        'lastTrade': 116.32
    },
    {
        'symbol': 'K',
        'name': 'Kellogg Company',
        'lastTrade': 70
    },
    {
        'symbol': 'MSFT',
        'name': 'Microsoft, Inc.',
        'lastTrade': 71.55
    },
    {
        'symbol': 'NU',
        'name': 'Northeast Utilities',
        'lastTrade': 38.02
    },
    {
        'symbol': 'RSH',
        'name': 'Radioshack Corporation',
        'lastTrade': 3.08
    },
    {
        'symbol': 'RTN',
        'name': 'Raytheon Company',
        'lastTrade': 57.93
    },
    {
        'symbol': 'SAPE',
        'name': 'Sapient Corporation',
        'lastTrade': 12.36
    },
    {
        'symbol': 'URBN',
        'name': 'Urban Outfitters',
        'lastTrade': 10
    },
    {
        'symbol': 'YHOO',
        'name': 'Yahoo! Inc.',
        'lastTrade': 20
    }
];

exports.getAll = function() {
    'use strict';
    return instruments;
};

exports.get = function(symbol) {
    'use strict';
    return _.where(instruments, {symbol: symbol});
};