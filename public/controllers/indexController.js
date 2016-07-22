var app = angular.module('ffcBot', []);


app.controller('IndexController', function($scope, $http) {
    
    $scope.title = 'FFCBOT DISCORD LOGS';

    $http.get('/logs').success(function(res){
        $scope.logs = res;
    });
});
