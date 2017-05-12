'use strict';

angular.module('shopnxApp')
        .controller('WishlistCtrl', function ($scope, Auth, Wishlist, toastr) { //, socket, Category, Modal, toastr
            $scope.user = Auth.getCurrentUser();
            Wishlist.searchByCustomer.query({customerId: $scope.user.id}, function (resp) {
                $scope.wishlist = resp;
            });
            $scope.removeWishlist = function (w) {
                Wishlist.delete({id: w.id}).$promise.then(function (resp) {
                    if (resp && resp.message) {
                        toastr.error(resp.message, "Error!");
                    }
                    else {
                        toastr.success("Product removed from your wishlist", "Success!");
                        _.remove($scope.wishlist, w);
                    }
                });
            };
        });
