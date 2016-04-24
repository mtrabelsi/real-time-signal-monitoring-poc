angular
    .module('app.poc1', ['ui.router', 'chart.js'])
    .controller('Poc1Controller', poc1Controller);

function poc1Controller($scope, $http, $interval) {
    
    $scope.MAX_VIEW_PORT = 10;// max data before shifting
    $scope.graphConfig = {
        range: 250,
        frequency: 2
    };

    $scope.labels = [];
    $scope.series = ['DS1', 'DS2'];
    $scope.data = [[],[]];

    var i = 0;
    var updateGraph = function() {
        $http.get('/data')
            .then(function(res) {

                $scope.data[0].push(res.data.DS1);
                $scope.data[1].push(res.data.DS2);
                //get interval in second (formula: t = 1/f)
                var t = (1 / $scope.graphConfig.frequency);//intervle in seconde
                $scope.labels.push((i*t)+'s');
                i++;

                if ($scope.labels.length >= $scope.MAX_VIEW_PORT) {
                    $scope.data[0].shift();
                    $scope.data[1].shift();
                    $scope.labels.shift();
                }

            });
    }

    var interval = null;
    $scope.$watch('graphConfig', function(newValue, oldValue) {
        if (newValue.range != oldValue.range) {
            $http.put('/range', { newRange: newValue.range }).then(function(res) {
                console.log('range changed', res);
            });
        }
        if (newValue.frequency != oldValue.frequency || !interval) {
            $interval.cancel(interval);
            var t = (1 / newValue.frequency) * 1000; // interval in millisecond
            interval = $interval(updateGraph, t);
        }

    }, true);

}
