'use strict';

angular.module('shopnxApp')
  .controller('WishlistCtrl', function ($scope, Auth) { //, socket, Category, Modal, toastr
    $scope.user = Auth.getCurrentUser();
  });
