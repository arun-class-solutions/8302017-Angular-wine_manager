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

    $scope.submitWine = function(event) {
        event.preventDefault();

        $http
        .post("http://myapi-profstream.herokuapp.com/api/707381/wines", $scope.wine)
        .then(function(newWine) {
            // Step 1: Take newly-created wine object and add it to the UI
            // Step 2: Close the modal window
            // Hint: To close the modal -> $("#add-wine-modal").modal("hide");
            $scope.wines.push(newWine.data);

            $("#add-wine-modal").modal("hide");
        }, function(err) {
            console.log(err);
        });
    }
});