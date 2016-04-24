angular
    .module('app.poc1', ['ui.router'])
    .controller('Poc1Controller', poc1Controller);

function poc1Controller($scope, $http, $interval) {

    $scope.metadata = {
        startDate: new Date(),
        nbrOfSamples: 0,
        nbrOfTotalColisions: 0
    };

    $scope.MAX_VIEW_PORT = 10; // max data before shifting
    $scope.graphConfig = {
        range: 250,
        frequency: 2
    };

    var canvasGraph = document.getElementById('graph'),
        canvasBarChar = document.getElementById('barChar'),
        ctxGraph = canvasGraph.getContext('2d'),
        ctxBarChar = canvasBarChar.getContext('2d'),
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

    var data = {
        labels: [],
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: []
        }]
    };

    // discret graph
    var myLiveChart = new Chart(ctxGraph).Line(startingData, {});
    //bar chart
    var myBarChart = new Chart(ctxBarChar).Bar(data, {});

    var nbrOfCollision = 0;

    var xGraph = 0;
    var updateGraph = function() {
        $http.get('/data')
            .then(function(res) {
                if (res.data.DS1 == res.data.DS2) {
                    nbrOfCollision++;
                    $scope.metadata.nbrOfTotalColisions++;
                }
                var t = (1 / $scope.graphConfig.frequency); //intervle in seconde
                myLiveChart.addData([res.data.DS1, res.data.DS2], (xGraph * t) + 's');
                // shifting our view
                if (xGraph > $scope.MAX_VIEW_PORT) myLiveChart.removeData();
                xGraph++;
                $scope.metadata.nbrOfSamples++;
            });
    };


    var xBar = 1;
    var updateBar = function() {
        myBarChart.addData([nbrOfCollision], xBar + 'min'); //intervle of 1 minute
        nbrOfCollision = 0; //reset the nbr of collision for the next minute
        // shifting our view
        if (xBar > $scope.MAX_VIEW_PORT) myBarChart.removeData();
        xBar++;
    }
    var intervalBar = $interval(updateBar, 1000 * 60); //1 min

    var intervalGraph = null;
    $scope.$watch('graphConfig', function(newValue, oldValue) {
        if (newValue.range != oldValue.range) {
            $http.put('/range', { newRange: newValue.range }).then(function(res) {
                console.log('range changed', res);
            });
        }
        if (newValue.frequency != oldValue.frequency || !intervalGraph) {
            $interval.cancel(intervalGraph);
            var t = (1 / newValue.frequency) * 1000; // interval in millisecond
            intervalGraph = $interval(updateGraph, t);
        }

    }, true);

    $scope.printReport = function() {
        window.print();
    };

}
