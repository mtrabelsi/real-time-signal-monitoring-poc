angular
    .module('app')
    .config(function($urlRouterProvider) {
    	//we seek the inti state
        $urlRouterProvider.otherwise('/init');
    });
