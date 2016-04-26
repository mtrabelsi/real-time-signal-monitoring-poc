var app = require('./app.js');

var utils = require('./utils/utils');

var helper = require('./utils/helper');

//the require is a singleton so the change will affect all the api
var constant = require('./utils/constant'); //we're gonna change this by api


app.put('/range', function(req, res, next) {
    constant.range.step1.minRange = -(req.body.newRange / 2);
    constant.range.step1.maxRange = req.body.newRange / 2;
    res.json(constant);
});

app.get('/range', function(req, res, next) {
    res.json(constant);
});


app.get('/data/poc1', function(req, res, next) {

    var data = {
        DS1: null,
        DS2: null
    };

    utils.urandomPromise(1).then(function(urandomBuffer) {
        data.DS1 = helper.normalize(urandomBuffer[0]);
        return utils.cryptoPromise(1);
    }, function(error) {
        console.log('failed on the crypto module:', error);
    }).then(function(cryptoBuffer) {
        data.DS2 = helper.normalize(cryptoBuffer[0]);

        res.json(data);

    }, function(error) {
        console.log('failed on the /dev/urandom module:', error);
    });


});

app.get('/data/poc2', function(req, res, next) {

    var data = {
        DS1: null,
        DS2: null
    };

    utils.urandomPromise(1).then(function(urandomBuffer) {
        data.DS1 = helper.normalizeProc2(urandomBuffer[0]);
        return utils.cryptoPromise(1);
    }, function(error) {
        console.log('failed on the crypto module:', error);
    }).then(function(cryptoBuffer) {
        data.DS2 = helper.normalizeProc2(cryptoBuffer[0]);

        res.json(data);

    }, function(error) {
        console.log('failed on the /dev/urandom module:', error);
    });


});

app.get('/book', function(req, res, next) {
    helper.getShakespeareContent().then(function(shakespeareBook) {
        res.json(shakespeareBook);
    },function(error){
        console.log(error);
    });
});
