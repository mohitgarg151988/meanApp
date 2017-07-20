/**
 * Created by mohitgupta on 12/7/17.
 */
angular.module('yapp').factory("DataService",[ '$q', '$timeout', '$http',
    function($q, $timeout, $http) {
        return {
            getEmployeeData: function() {
                return $http({
                    url: 'http://localhost:5001/getEmployee',
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(successCallback, errorCallback);
                function successCallback(response){
                    //console.log("Success!");
                    return response.data;
                }
                function errorCallback(error){
                    console.log("Error.");
                    console.log(error);
                }
            },
            getUserData: function(userName,password) {
                return $http({
                    url: 'http://localhost:5001/users/login',
                    method: "POST",
                    data: {"userName" : userName, "password" : password},
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(successCallback, errorCallback);
                function successCallback(response){
                    return response.data;
                }
                function errorCallback(error){
                    console.log(error);
                }
            }
        };
    }
]);