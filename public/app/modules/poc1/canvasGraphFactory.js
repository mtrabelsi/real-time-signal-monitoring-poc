angular
    .module('app.poc1')
    .factory('CanvasGraphFactory', canvasGraphFactory);

//canvasGraphFactory.$inject = [];

function canvasGraphFactory() {

    var ctxGraph = null;
    var data = null;

    var initData = function() {//private function
        data = {
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
        }
    };

    var init = function(id) {
        var canvasGraph = document.getElementById(id);
        ctxGraph = canvasGraph.getContext('2d');
        initData();
    }

    var getGraph = function() {
        return new Chart(ctxGraph).Line(data, { animationSteps: 7 });
    }
    return {
        init: init,
        getGraph: getGraph
    };
}
