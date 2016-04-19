angular
    .module('app.init')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('init', {
                url: '/init',
                templateUrl: 'app/modules/init/init.html',
                controller: 'InitController'
            })
    });
