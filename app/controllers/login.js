'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', ['DataService','$scope','$location',
      function(DataService,$scope,$location) {

        $scope.submit = function() {
            DataService.getUserData($scope.userName, $scope.password)
                .then(function(results) {
                    if (results._id){
                        $location.path('/dashboard');
                    } else {
                        if (angular.isString(results))
                            $scope.errorMessage = results+', Please use valid credentials.';
                        else
                            $scope.errorMessage = 'Please use valid credentials.';
                    }
                }, function(error) {
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
