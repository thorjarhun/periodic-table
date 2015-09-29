'use strict';
LIVERELOAD_PORT = 35729;

gruntFunction = (grunt) ->
    gruntConfig =
        pkg:
            grunt.file.readJSON 'package.json'

        connect:
            all:
              options:
                  base: 'src'
                  livereload: LIVERELOAD_PORT
                  port: 8080
                  hostname: '0.0.0.0'

        watch:
            all:
                options:
                    livereload: LIVERELOAD_PORT
                files: ['src/**/*']
 
    grunt.initConfig gruntConfig
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-connect'

    grunt.registerTask 'server', ['connect', 'watch']
    null
 
module.exports = gruntFunction