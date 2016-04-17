var app = require('./app.js');

var utils = require('./utils/utils');

var helper = require('./utils/helper');



app.get('/data', function(req, res, next) {

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
