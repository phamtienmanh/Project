'use strict';

angular.module('shopnxApp')
  .controller('RatingCtrl', function ($scope, Auth) { //, socket, Category, Modal, toastr
    $scope.user = Auth.getCurrentUser();
  });
