var app = angular.module('FFCBOT', []);


app.controller('GrimoireCtrl', function($scope, $http) {
    
    $scope.title = 'FFCBOT Grimoire Test';    

    $http.get('/grimoire').then(function($scope){
        $scope.cards = grimoire;
    });
})