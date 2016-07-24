angular.module('ffcBot', [
        'ngRoute',
        'ngMaterial'
    ])
    .config(config)

    .controller('IndexController', function(){
        var ic = this;
        ic.title = 'DASHBOARD';
    });

function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './app/views/index.html'
        });

    $locationProvider.html5Mode(true);
};