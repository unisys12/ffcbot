angular.
    module('ffcBot')

.controller('LogController', function($http) {

    var ic = this;
    
    ic.title = 'FFCBOT DISCORD LOGS';

    $http.get('/logs').success(function(res){
        ic.logs = res;
    });
});