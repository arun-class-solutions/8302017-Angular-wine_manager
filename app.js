var app = angular.module("wineApp", []);

app.controller("wineListCtrl", function($scope, $http) {
    $http
    .get("http://myapi-profstream.herokuapp.com/api/707381/wines")
    .then(function(wines) {
        // Assign array of wines to the scope so we can template them out in the UI
        $scope.wines = wines.data;
    }, function(err) {
        console.log(err);
    });
});