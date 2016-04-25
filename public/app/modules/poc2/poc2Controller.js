angular
    .module('app.poc2', ['ui.router'])
    .controller('Poc2Controller', poc2Controller);

function poc2Controller($scope, $interval, $http) {

	 $scope.metadata = {
        startDate: new Date(),
        nbrOfSamples: 0,
        nbrOfTotalDistinct: 0
    };

    $scope.MAX_VIEW_PORT = 10; // max data before shifting
    $scope.graphConfig = {
        frequency: 20
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
    var myLiveChart = new Chart(ctxGraph).Line(startingData, {animationSteps: 7});
    //bar chart
    var myBarChart = new Chart(ctxBarChar).Bar(data, {});

    var nbrOfDistinct = 0;

    var xGraph = 0;
    var updateGraph = function() {
        $http.get('/data/poc2')
            .then(function(res) {
                if (res.data.DS1 != res.data.DS2) {
                    nbrOfDistinct++;
                    $scope.metadata.nbrOfTotalDistinct++;
                }
                var t = (1 / $scope.graphConfig.frequency); //intervle in seconde
                myLiveChart.addData([res.data.DS1, res.data.DS2], (xGraph * t) + 's');
                // shifting our view
                if (xGraph > $scope.MAX_VIEW_PORT) myLiveChart.removeData();
                xGraph++;
                $scope.metadata.nbrOfSamples++;
                //new random frequency between [1 hz, 25 hz]
                $scope.graphConfig.frequency = Math.floor((Math.random() * 25) + 1);
            });
    };


    var xBar = 1;
    var updateBar = function() {
        myBarChart.addData([nbrOfDistinct], xBar + 'min'); //intervle of 1 minute
        nbrOfDistinct = 0; //reset the nbr of collision for the next minute
        // shifting our view
        if (xBar > $scope.MAX_VIEW_PORT) myBarChart.removeData();
        xBar++;
    };
    var intervalBar = $interval(updateBar, 1000 * 60); //update the bar chat on 1 min interval

    var intervalGraph = null;
    $scope.$watch('graphConfig', function(newValue, oldValue) {
        if (newValue.frequency != oldValue.frequency || !intervalGraph) {
            $interval.cancel(intervalGraph);
            var t = (1 / newValue.frequency) * 1000; // interval in millisecond
            intervalGraph = $interval(updateGraph, t);
        }

    }, true);

}
