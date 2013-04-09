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
 * Application Configuration
 *
 * @author Naresh Bhatia
 */

/*jshint unused:false */

// Set up the "require" variable which RequireJS will pick up when it is loaded in main.js.
// This ensures that the configuration loads before any other scripts are required in.
var require = {
    // Initialize the application with the main application file
    deps: ['main'],

    paths: {
        // jQuery
        jquery:                      'vendor/jquery-1.8.3',
        jqueryui:                    'vendor/jquery-ui-1.10.0.custom.min',

        // Underscore
        underscore:                  'vendor/underscore-1.4.4',

        // Backbone
        backbone:                    'vendor/backbone-1.0.0',

        // Templating
        handlebars:                  'vendor/handlebars-1.0.rc.1'
    },

    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        handlebars: {
            exports: 'Handlebars'
        },

        jqueryui: {
            deps: ['jquery']
        },

        underscore: {
            exports: '_'
        }
    }
};