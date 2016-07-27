angular.module('ffcBot', [
        'ngRoute',
        'ngMaterial'
    ])
    .config(config)

    .controller('IndexController', function(){
        var vm = this;
        vm.title = 'DASHBOARD';
    })
    .controller('LoginController', function(){
        var vm = this;
        vm.title = 'LOGIN';
    })
    .controller('RegController', function($http){
        var vm = this;
        vm.user = {};
        vm.title = 'REGISTRATION';

        vm.submit = function(user) {
            vm.user = {
                name: user.name,
                email: user.email,
                password: user.password
            }

            console.log(vm.user);
            
        }

    });

function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './app/views/index.html'
        })
        .when('/login', {
            templateUrl: './app/views/login.html'
        })
        .when('/register', {
            templateUrl: './app/views/registration.html'
        });

    $locationProvider.html5Mode(true);
};