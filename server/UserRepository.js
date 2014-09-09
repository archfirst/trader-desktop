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
 * UserRepository.js
 *
 * @author Naresh Bhatia
 */

/*jshint node:true */

var _ = require('underscore');

var users = [
    {
        'id': 'AM',
        'name': 'Amadeus Mozart'
    },
    {
        'id': 'AR',
        'name': 'A. R. Rahman'
    },
    {
        'id': 'AY',
        'name': 'Alka Yagnik'
    },
    {
        'id': 'BL',
        'name': 'Bappi Lahiri'
    },
    {
        'id': 'BS',
        'name': 'Bruce Springsteen'
    },
    {
        'id': 'DS',
        'name': 'Donna Summer'
    },
    {
        'id': 'EC',
        'name': 'Eric Clapton'
    },
    {
        'id': 'EJ',
        'name': 'Elton John'
    },
    {
        'id': 'EP',
        'name': 'Elvis Presley'
    },
    {
        'id': 'GH',
        'name': 'George Harrison'
    },
    {
        'id': 'JH',
        'name': 'Jimi Hendrix'
    },
    {
        'id': 'JL',
        'name': 'John Lennon'
    },
    {
        'id': 'JS',
        'name': 'Jagjit Singh'
    },
    {
        'id': 'KG',
        'name': 'Kunal Ganjawala'
    },
    {
        'id': 'KK',
        'name': 'Kishore Kumar'
    },
    {
        'id': 'LM',
        'name': 'Lata Mangeshkar'
    },
    {
        'id': 'MD',
        'name': 'Madonna'
    },
    {
        'id': 'MJ',
        'name': 'Michael Jackson'
    },
    {
        'id': 'MR',
        'name': 'Mohammed Rafi'
    },
    {
        'id': 'ND',
        'name': 'Neil Diamond'
    },
    {
        'id': 'PM',
        'name': 'Paul McCartney'
    },
    {
        'id': 'PS',
        'name': 'Paul Simon'
    },
    {
        'id': 'RB',
        'name': 'Rahul Dev Burman'
    },
    {
        'id': 'RS',
        'name': 'Ringo Starr'
    },
    {
        'id': 'RW',
        'name': 'Roger Waters'
    },
    {
        'id': 'SG',
        'name': 'Shreya Ghoshal'
    },
    {
        'id': 'SM',
        'name': 'Shankar Mahadevan'
    },
    {
        'id': 'SN',
        'name': 'Sonu Nigam'
    },
    {
        'id': 'SW',
        'name': 'Stevie Wonder'
    },
    {
        'id': 'UN',
        'name': 'Udit Narayan'
    }
];

exports.getAll = function() {
    'use strict';
    return users;
};

exports.get = function(id) {
    'use strict';
    return _.where(users, {id: id});
};