'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
var states = [
        { name: 'base', state: { abstract: true, url: '', templateUrl: 'app/views/base.html', data: {text: "Base", visible: false } } },
        { name: 'login', state: { url: '/login', parent: 'base', templateUrl: 'app/views/login.html', controller: 'LoginCtrl', data: {text: "Login", visible: false } } },
        { name: 'dashboard', state: { url: '/dashboard', parent: 'base', templateUrl: 'app/views/dashboard.html', controller: 'DashboardCtrl', data: {text: "Dashboard", visible: false } } },
        { name: 'overview', state: { url: '/overview', parent: 'dashboard', templateUrl: 'app/views/dashboard/overview.html', data: {text: "Overview", visible: true } } },
        { name: 'reports', state: { url: '/reports', parent: 'dashboard', templateUrl: 'app/views/dashboard/reports.html', data: {text: "Employee Reports", visible: true } } },
        { name: 'logout', state: { url: '/login',controller: 'LogoutCtrl', data: {text: "Logout", visible: true }} }
    ];
   
angular.module('yapp', [
                'ui.router',
                'snap',
                'ngAnimate',
                'ngMessages',
                'ngRoute',
                'ngStorage'
            ])
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('/dashboard', '/dashboard/overview');
            $urlRouterProvider.otherwise('/login');
            
            angular.forEach(states, function (state) {
                $stateProvider.state(state.name, state.state);
            });
        })
        .run(function ($rootScope, $http, $location, $localStorage) {
            // keep user logged in after page refresh
            if ($localStorage.currentUser) {
                $http.defaults.headers.common.Authorization = $localStorage.currentUser.token;
            }

            // redirect to login page if not logged in and trying to access a restricted page
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                var publicPages = ['/login'];
                var restrictedPage = publicPages.indexOf($location.path()) === -1;
                if (restrictedPage && !$localStorage.currentUser) {
                    $location.path('/login');
                }
            });
        });
