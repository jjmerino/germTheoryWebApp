angular.module('app.controllers.user', [])

  .controller('UserCtrl', function ($scope, $location, AuthService) {
    $scope.user = {};

    $scope.signin = function() {
      AuthService.signin($scope.user)
        .then(function (resp) {
          $scope.user = resp.data.user;
          $location.path('/tab/myrisk');
        })
        .catch(function (error) {
          alert(error.data.error);
          $location.path('/signin');
        });
    };

    $scope.signup = function() {
      AuthService.signup($scope.user)
        .then(function(resp) {
          $scope.user = resp.data.user;
          $location.path('/tab/myrisk');
        })
        .catch(function(error) {
          alert(error.data.error);
          $location.path('/signup');
        });
    };

    $scope.signout = function() {
      AuthService.signout();
      $scope.user = null;
    };
  });

  
