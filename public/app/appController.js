angular
    .module('app')
    .controller('AppController', appController);

function appController($scope, $state, $rootScope) {
    //this scope function will be inhereted by childs controllers
    $scope.goTo = function(targetState) {
        $state.go(targetState);
    };
}
