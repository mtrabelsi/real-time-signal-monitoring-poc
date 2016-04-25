angular
    .module('app.poc1', ['ui.router'])
    .controller('Poc1Controller', poc1Controller);

function poc1Controller(CanvasGraphFactory, CanvasBarChartFactory, $scope, $http, $interval, $window, MAX_VIEW_PORT, GRAPH_CONFIG) {
    $scope.metadata = {
        startDate: new Date(),
        nbrOfSamples: 0,
        nbrOfTotalColisions: 0
    };

    $scope.graphConfig = {
        range: GRAPH_CONFIG.range,
        frequency: GRAPH_CONFIG.frequency
    };

    // discret graph
    CanvasGraphFactory.init('graph');
    var myLiveChart = CanvasGraphFactory.getGraph();

    //bar chart
    CanvasBarChartFactory.init('barChar');
    var myBarChart = CanvasBarChartFactory.getBarChart();

    var nbrOfCollision = 0;

    var xGraph = 0;
    var updateGraph = function() {
        $http.get('/data/poc1')
            .then(function(res) {
                if (res.data.DS1 == res.data.DS2) {
                    nbrOfCollision++;
                    $scope.metadata.nbrOfTotalColisions++;
                }
                var t = (1 / $scope.graphConfig.frequency); //intervle in seconde
                myLiveChart.addData([res.data.DS1, res.data.DS2], (xGraph * t) + 's');
                // shifting our view
                if (xGraph > MAX_VIEW_PORT) myLiveChart.removeData();
                xGraph++;
                $scope.metadata.nbrOfSamples++;
            });
    };

    var xBar = 1;
    var updateBar = function() {
        myBarChart.addData([nbrOfCollision], xBar + 'min'); //intervle of 1 minute
        nbrOfCollision = 0; //reset the nbr of collision for the next minute
        // shifting our view
        if (xBar > MAX_VIEW_PORT) myBarChart.removeData();
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
        $window.print();
    };

}
