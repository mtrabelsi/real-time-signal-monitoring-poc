angular
    .module('app.poc2', ['ui.router'])
    .controller('Poc2Controller', poc2Controller);

function poc2Controller(CanvasGraphFactory, eBook, CanvasBarChartFactory, MAX_VIEW_PORT, GRAPH_CONFIG, $scope, $interval, $http) {
    $scope.metadata = {
        startDate: new Date(),
        nbrOfSamples: 0,
        nbrOfTotalDistinct: 0
    };

    $scope.graphConfig = {
        frequency: GRAPH_CONFIG.frequency
    };

    $scope.generatedWords = {
        fromDS1: '',
        fromDS2: ''
    };

    // discret graph
    CanvasGraphFactory.init('graph');
    var myLiveChart = CanvasGraphFactory.getGraph();

    //bar chart
    CanvasBarChartFactory.init('barChar');
    var myBarChart = CanvasBarChartFactory.getBarChart();

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
                myLiveChart.addData([res.data.DS1, res.data.DS2], (xGraph * t).toFixed(1) + 's');
                // shifting our view
                if (xGraph > MAX_VIEW_PORT) myLiveChart.removeData();
                xGraph++;
                $scope.metadata.nbrOfSamples++;
                //new random frequency between [1 hz, 25 hz]
                $scope.graphConfig.frequency = Math.floor((Math.random() * 25) + 1);

                $scope.generatedWords.fromDS1 += ' ' + eBook.data[res.data.DS1];
                $scope.generatedWords.fromDS2 += ' ' + eBook.data[res.data.DS2];
            });
    };

    var xBar = 1;
    var updateBar = function() {
        myBarChart.addData([nbrOfDistinct], xBar + 'min'); //intervle of 1 minute
        nbrOfDistinct = 0; //reset the nbr of collision for the next minute
        // shifting our view
        if (xBar > MAX_VIEW_PORT) myBarChart.removeData();
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

    $scope.stop = function() {
        $interval.cancel(intervalGraph);
        $interval.cancel(intervalBar);
    }

    $scope.download = function() {
        var blob1 = new Blob([$scope.generatedWords.fromDS1], { type: "text/plain;charset=utf-8" });
        var blob2 = new Blob([$scope.generatedWords.fromDS2], { type: "text/plain;charset=utf-8" });
        saveAs(blob1, "DS1.txt");
        saveAs(blob2, "DS2.txt");
    }
}
