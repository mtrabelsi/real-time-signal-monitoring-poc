angular
    .module('app.poc2')
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/poc2');
        $stateProvider
            .state('poc2', {
                url: '/poc2',
                templateUrl: 'app/modules/poc2/poc.html',
                controller: 'Poc2Controller'
            })
    });
