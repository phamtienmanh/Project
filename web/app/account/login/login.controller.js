'use strict';

angular.module('shopnxApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.showPassword = false;
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function(resp) {
          // Logged in, redirect to the page with requested a login
            if(resp.data==""){
                $scope.errors.other = "Check email and password again!";
            }
            else{
                Auth.redirectToAttemptedUrl();
            }
        })
        .catch( function(err) {
          $scope.errors.other = err;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = 'auth/' + provider;
    };
  });
