'use strict';

angular.module('yapp')
    .controller('employeeList', ['DataService','$scope',
        function(DataService,$scope) {
            DataService.getEmployeeData()
                .then(function(results) {
                    $scope.rowLimit	 = 3;
                    $scope.sortOrder = 'gender';
                    $scope.employees = results;
                    $scope.getCount = results.length;
                }, function(error) {
                	console.log(error);
				})
                .finally(function() {
					console.log('executed finally in employee list');
                });

        }
    ]);
