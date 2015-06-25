# stream-passthru
AKA vlc-passthru

Pass through files to VLC to make a make-shift streamer
Supports a platform that supports node.js, child_process.spawn, and VLC

##Features

* Username/Password Support
* Exits parent process and allows for streaming after closing SSH
* Provides wait argument to hold parent process open to allow closing of VLC
* Verbose flag prints arguments passed in
* Multiple files with simple interface


##Install

```
$ sudo apt-get install vlc
$ git clone https://github.com/brandonhesse/stream-passthru.git stream-passthru
$ cd stream-passthru
$ sudo npm install -g
$ stream-passthru [options] file [...files]
```

Supports a "rc" file through [rc](https://www.npmjs.com/package/rc)
Command line arguments override the config file operations
Tested with node.js version 10.36, should work to current stable.

##To do

* Tests
* Support SSL certificate