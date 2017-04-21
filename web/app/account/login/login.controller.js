'use strict';

angular.module('shopnxApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.showPassword = false;
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function(resp) {
          // Logged in, redirect to the page with requested a login
            if(resp.data && resp.data.message){
                $scope.errors.other = resp.data.message;
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
