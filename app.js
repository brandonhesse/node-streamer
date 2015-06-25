#!/usr/bin/env node

(function () {
    "use strict";
    var path = require('path'),
        util = require('util'),
        chalk = require('chalk'),
        _ = require('lodash'),
        spawn = require('child_process').spawn,
        pkg = require('./package.json'),
        defaults, conf, argv, _o;

    defaults = {
        vlc: '/usr/bin/vlc',
        username: '',
        password: '',
        cache: 1000,
        path: '',
        ttl: 20,
        port: 8080,
        wait: false
    };
    conf = require('rc')(pkg.name, defaults);
    argv = require('minimist')(process.argv.splice(2), {
        string: ['vlc', 'username', 'password', 'path'],
        boolean: ['help', 'verbose', 'wait', 'version'],
        alias: {
            'help': 'h',
            'verbose': 'v',
            'version': 'V',
            'wait': 'w',
            'port': 'p'
        }
    });

    _o = _.extend({}, [conf, argv]);

    if (_o.version) {
        console.log(
            chalk.bold(pkg.name + ': ') + pkg.version
        );
        process.exit(0);
    }

    if (_o.help) {
        console.log(pkg.name + " [options] file [...file]");
        process.exit(0);
    }

    // spawn(cmd, [args], {opts});
    var aggregate = ['-I','dummy','--play-and-exit','--no-random','--no-loop'];
    var file_opts = [
        ['--file-caching=', _o.cache].join(''),
        ['--sout=#std{access=http{user=', _o.username,
            ',pwd=', _o.password,
            ',mime=video/x-flv},mux=ffmpeg{mux=flv},dst=:', _o.port,
            '/', _o.path, '}'].join(''),
        ['--ttl=', _o.ttl].join('')
    ];

    _o._.forEach(function (file) {
        aggregate = aggregate.concat(file, file_opts);
    });

    spawn(_o.vlc, aggregate, { detached: _o.wait });
}());