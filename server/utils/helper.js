var constant = require('./constant');
var Q = require('q');

module.exports = {
    normalize: function(randomValue) {
        var widthRange = constant.range.step1.maxRange - constant.range.step1.minRange;
        if (randomValue <= constant.range.step1.maxRange) {
            if (randomValue != 0) randomValue *= -1;
        }
        if (randomValue > constant.range.step1.maxRange && randomValue <= widthRange) {
            randomValue -= constant.range.step1.maxRange;
        }
        if (randomValue >= widthRange) {
            randomValue = constant.range.step1.maxRange;
        }
        return randomValue;
    },
    normalizeProc2: function(randomValue) {
        if (randomValue >= constant.range.step2.maxRange) {
            randomValue = constant.range.step2.maxRange;
        }
        if (randomValue < constant.range.step2.minRange) {
            randomValue = 0;
        }
        return randomValue;
    },
    getShakespeareContent: function() { //for a good performance we need to read line by line
        var deferred = Q.defer();
        var readline = require('readline');
        var fs = require('fs');

        var rl = readline.createInterface({
            input: fs.createReadStream('assets/file/t8.shakespeare.txt')
        });

        var wordCount = 0;
        var fullBook = [];
        rl.on('line', function(line) {
            line = line.replace(/(^\s*)|(\s*$)/gi, ""); //exclude  start and end white-space
            line = line.replace(/[ ]{2,}/gi, " "); //2 or more space to 1
            var d = (line == '') ? 0 : line.split(' ').length;
            if(d!=0) Array.prototype.push.apply(fullBook, line.split(' '));// Merge the second array into the first one

            wordCount += d;
        }).on('close', function() {
            if(fullBook.length===wordCount){
                console.log('Shakespeare Content loaded! ');
                deferred.resolve(fullBook);
            } else {
                 deferred.reject(' Data length is not equals, normal? ');
            }
        });
        return deferred.promise;
    }



}
