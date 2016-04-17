//random source of /dev/urandom
var RandBytes = new require('randbytes');
var randomSource = RandBytes.urandom.getInstance();
//crypto module
var crypto = require('crypto');
var Q = require('q');

module.exports = {
    //convert a callback function to a promise function
    cryptoPromise: Q.denodeify(crypto.randomBytes),

    /* since the randomSource.getRandomBytes function can't be denodeified 
     *  so we use the defer technique
     */
    urandomPromise: function(nbrOfBuffers) {
        var deferred = Q.defer();

        randomSource.getRandomBytes(nbrOfBuffers, function(buff) {
            if (buff == null)
                deferred.reject(err);
            else
                deferred.resolve(buff);
        });

        return deferred.promise;
    }
}
