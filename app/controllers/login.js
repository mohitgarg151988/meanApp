'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of yapp
 */
angular.module('yapp')
    .controller('RegisterCtrl',['DataService','$scope','$location',
        function(DataService,$scope,$location) {

            $scope.submit = function() {
                DataService.registerUser($scope.formData)
                    .then(function(results) {
                        if (results.success){
                            $location.path('/login');
                        } else {
                            $scope.errorMessage = results.message;
                        }
                    }, function(error) {
                        $scope.errorMessage = false;
                        console.log(error);
                        return false;
                    })
                    .finally(function() {
                        return false;
                        console.log('executed finally in register route');
                    });

                return false;
            }
        }
    ])
    .controller('LogoutCtrl',['$http','$localStorage',
        function ($http,$localStorage) {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    ])
    .controller('LoginCtrl', ['DataService','$scope','$location','$http','$localStorage',
      function(DataService,$scope,$location,$http,$localStorage) {
    
        $scope.submit = function() {
            DataService.getUserData($scope.userName, $scope.password)
                .then(function(results) {
                    if (results.token){
                        // store token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = {token: results.token };
                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = results.token;
                        $location.path('/dashboard');
                    } else {
                        if (angular.isString(results.message))
                            $scope.errorMessage = results.message+', Please use valid credentials.';
                        else
                            $scope.errorMessage = 'Please use valid credentials.';
                    }
                }, function(error) {console.log(error);
                    $scope.errorMessage = false;
                    console.log(error);
                    return false;
                })
                .finally(function() {
                    return false;
                    console.log('executed finally in login route');
                });
    
            return false;
        }
      }
    ]);
