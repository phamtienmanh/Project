'use strict';

angular.module('shopnxApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};
    
    $scope.checkPassword =function(password){
        var currentUser = Auth.getCurrentUser();
        if (password==currentUser.password) {
            return true;
        }
        return false;
    };
    
    $scope.changePassword = function(form) {
      $scope.submitted = true;
//      if(form.$valid) {
//        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
//        .then( function() {
//          $scope.message = 'Password successfully changed.';
//        })
//        .catch( function() {
//          form.password.$setValidity('mongoose', false);
//          $scope.errors.other = 'Incorrect password';
//          $scope.message = '';
//        });
//      }
        $scope.checkNewPasswordErr = false;
        if(form.$valid){
        if (!$scope.checkPassword($scope.user.oldPassword)) {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
        }else if($scope.checkPassword($scope.user.newPassword)){
            $scope.checkNewPasswordErr = true;
            $scope.message = '';
        }else {
            Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
            .then( function() {
              $scope.message = 'Password successfully changed.';
            })
            .catch( function() {
//              form.password.$setValidity('mongoose', false);
//              $scope.errors.other = 'Incorrect password';
//              $scope.message = '';
        });
        }
        }
    };
  });
