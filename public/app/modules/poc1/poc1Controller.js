angular
    .module('app.poc1', ['ui.router'])
    .controller('Poc1Controller', poc1Controller);

function poc1Controller($scope, $http, $interval) {

    $scope.MAX_VIEW_PORT = 10; // max data before shifting
    $scope.graphConfig = {
        range: 250,
        frequency: 2
    };

    var canvas = document.getElementById('updating-chart'),
        ctx = canvas.getContext('2d'),
        startingData = {
            labels: [],
            datasets: [{
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: []
            }, {
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: []
            }]
        };

    // Reduce the animation steps for demo clarity.
    var myLiveChart = new Chart(ctx).Line(startingData, {});

    var i = 0;
    var updateGraph = function() {
        $http.get('/data')
            .then(function(res) {
                var t = (1 / $scope.graphConfig.frequency); //intervle in seconde
                myLiveChart.addData([res.data.DS1, res.data.DS2], (i * t) + 's');
                // shifting our view
                if(i > $scope.MAX_VIEW_PORT) myLiveChart.removeData();
                i++;
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
