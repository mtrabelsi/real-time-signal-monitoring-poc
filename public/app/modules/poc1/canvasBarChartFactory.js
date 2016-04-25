angular
    .module('app.poc1')
    .factory('CanvasBarChartFactory', canvasBarChartFactory);

//canvasBarChartFactory.$inject = [];

function canvasBarChartFactory() {

    var ctxBarChart = null;
    var data = null;

    var initData = function() { //private function
        data = {
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
    };

    var init = function(id) {
        var canvasBarChar = document.getElementById(id);
        ctxBarChart = canvasBarChar.getContext('2d');
        initData();
    }

    var getBarChart = function() {
        return new Chart(ctxBarChart).Bar(data, {});
    }
    return {
        init: init,
        getBarChart: getBarChart
    };
}
