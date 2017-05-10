'use strict';

angular.module('shopnxApp')
        .controller('WishlistCtrl', function ($scope, Auth, Wishlist) { //, socket, Category, Modal, toastr
            $scope.user = Auth.getCurrentUser();
            Wishlist.searchByCustomer.query({customerId: $scope.user.id}, function (resp) {
                $scope.wishlist = resp;
            });
        });
