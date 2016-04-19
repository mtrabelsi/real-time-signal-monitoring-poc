angular
    .module('app.poc1')
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/poc1');
        $stateProvider
            .state('poc1', {
                url: '/poc1',
                templateUrl: 'app/modules/poc1/poc.html',
                controller: 'Poc1Controller'
            })
    });
