'use strict';

module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: [
                    'server/*.js',
                    'Gruntfile.js'
                ],
                tasks: ['jshint']
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'server/*.js',
                'Gruntfile.js'
            ]
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'watch'
    ]);
};