var mainApp = angular.module("mainApp", ['ngRoute', 'ui.bootstrap']);
         mainApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.
            
            when('/home',{
               templateUrl: 'app/pages/home.html',
               controller: 'homeController'
            }).
            when('/groups', {
               templateUrl: 'app/pages/groups.html',
               controller: 'groupsController'
            }).
            when('/signIn',{
               templateUrl: 'app/pages/signIn.html',
               controller: 'signInController'
            }).
            otherwise('/signIn')
         }]);

         