# RandBytes

Get a buffer of random bytes from /dev/urandom (or another) file.

# Instalation

## Npm

```
$ npm install randbytes
```

## Compiling:

RandBytes is written on CoffeeScript, first you need install this with `npm install coffee-script`

```
$ git clone https://github.com/exos/node-randbytes.git
$ cd node-randbytes
$ coffee -c -o . src/
```

# Usage

Reading from /dev/urandom (secure and faster):

```javascript

var RandBytes = new require('randbytes');

var randomSource = RandBytes.urandom.getInstance();

randomSource.getRandomBytes(100, function (buff) {
    console.log(buff.length, " bytes from /dev/urandom :) ");
});

```

Or:

```javascript

var RandBytes = require('randbytes');

RandBytes.getRandomBytes(512, console.log);
```

## Get rand bytes from timestamp

If you are not using a Unix like OS, you can generate random bytes from time:

```javascript
var randomSource = RandBytes.timeRandom.getInstance();
```

## Using your own file

```javascript

var randomSource = new RandBytes.urandom({
    filePath: '/home/you/walesongs.wav'
});

```

## Create a instance of urandom with /dev/random as source

If you need a high randomize source, you can read from /dev/random, but is very slowly.

```javascript
var randomSource.getHighRandomSource();

randomSource.getRandomBytes(128, function (buff) {
    console.log(buff.length, " from /dev/random file ");
});
```
