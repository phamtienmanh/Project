'use strict';

angular.module('shopnxApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.showPassword = false;
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password,
          phone: $scope.user.phone,
          address: $scope.user.address
        })
        .then( function(resp) {
            if(resp.data && resp.data.message!=""){
                $scope.errors.other = resp.data.message;
            }
            else{
                Auth.redirectToAttemptedUrl();
            }
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
