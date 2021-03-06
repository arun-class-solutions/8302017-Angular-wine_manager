var app = angular.module("wineApp", ["ngRoute", "ngAnimate", "ngResource"]);

// Configure routing
app.config(function($routeProvider) {
    $routeProvider
        .when("/wines", {
            templateUrl: "templates/wine-list.html",
            controller: "wineListCtrl"
        })
        .when("/wines/:id/edit", {
            templateUrl: "templates/edit-wine.html",
            controller: "editWineCtrl"
        })
        .otherwise({
            redirectTo: "/wines"
        });
});

// Set up Wine model using the $resource service
app.factory("Wine", function($resource) {
    return $resource("http://myapi-profstream.herokuapp.com/api/707381/wines/:id", {
        id: "@id"
    }, {
        update: {
            method: "PUT"
        }
    });
});

app.controller("wineListCtrl", function($scope, Wine) {
    // $http
    // .get("http://myapi-profstream.herokuapp.com/api/707381/wines")
    // .then(function(wines) {
    //     // Assign array of wines to the scope so we can template them out in the UI
    //     $scope.wines = wines.data;
    // }, function(err) {
    //     console.log(err);
    // });

    // Use the resource module to make a GET request to /wines
    Wine
    .query(function(wines) {
        $scope.wines = wines;
    }, function(err) {
        console.log(err);
    });

    $scope.submitWine = function(event) {
        event.preventDefault();

        // $http
        // .post("http://myapi-profstream.herokuapp.com/api/707381/wines", $scope.wine)
        // .then(function(newWine) {
        //     // Step 1: Take newly-created wine object and add it to the UI
        //     // Step 2: Close the modal window
        //     // Hint: To close the modal -> $("#add-wine-modal").modal("hide");
        //     $scope.wines.push(newWine.data);

        //     $("#add-wine-modal").modal("hide");
        // }, function(err) {
        //     console.log(err);
        // });

        // Use the resource module to make a POST request to /wines
        Wine
        .save($scope.wine, function(newWine) {
            $scope.wines.push(newWine);

            // Hide the Bootstrap modal window
            $("#add-wine-modal").modal("hide");

            // Clear the form to make room for another submission
            $scope.wine = {};
        }, function(err) {
            console.log(err);
        });
    }
});

app.controller("editWineCtrl", function($scope, $routeParams, $location, Wine) {
    // $http
    // .get("http://myapi-profstream.herokuapp.com/api/707381/wines/" + $routeParams.id)
    // .then(function(singleWine) {
    //     // Attach the one wine coming back from the API to the scope so we can show it in the UI
    //     $scope.wine = singleWine.data;
    // }, function(err) {
    //     console.log(err);
    // });

    // Use the resource module to make a GET request to /wines/:id
    Wine
    .get({ id: $routeParams.id }, function(singleWine) {
        $scope.wine = singleWine;
    }, function(err) {
        console.log(err);
    });

    $scope.submitEdits = function(event) {
        event.preventDefault();

        // $http
        // .put("http://myapi-profstream.herokuapp.com/api/707381/wines/" + $routeParams.id, $scope.wine)
        // .then(function() {
        //     // Redirect user back to /wines when PUT request is successful
        //     $location.path("/wines");
        // }, function(err) {
        //     console.log(err);
        // });

        // Use the resource module to perform a PUT request to /wines/:id
        Wine
        .update({ id: $routeParams.id }, $scope.wine, function() {
            $location.path("/wines");
        }, function(err) {
            console.log(err);
        });
    }

    // On click of the delete wine button, perform a DELETE request to /wines/:id via the resource module
    $scope.deleteWine = function(wineId) {
        Wine
        .delete({ id: wineId }, function() {
            $location.path("/wines");
        }, function(err) {
            console.log(err);
        });
    }
});