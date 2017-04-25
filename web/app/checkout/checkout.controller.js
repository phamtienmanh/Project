'use strict';

angular.module('shopnxApp')
        .controller('CheckoutCtrl', function ($scope, Order, PaymentMethod, Shipping, Coupon, Country, Auth, Cart, $state, toastr) {
            $scope.msg = 'No items in cart. Shop Now';
            $scope.couponCode = '';
            $scope.customer = Auth.getCurrentUser();
            $scope.coupon = {};

            $scope.placeOrder = function (items) {
                var orderDetailCollection = [];
                for(var i=0; i<items.length ; i++){
                    items[i].packing.quantity = items[i].packing.quantity - items[i].quantity;
                    orderDetailCollection.push({productId: items[i].packing, quantity: items[i].quantity});
                }
                var data = {customerId: $scope.customer, orderDetailCollection: orderDetailCollection, couponId: $scope.coupon.message ? {} : $scope.coupon};
                Order.save(data).$promise.then(function (resp) {
                    if (resp && resp.message) {
                        toastr.error(resp.message, "Error!");
                    }
                    else {
                        toastr.success("Order Placed successfully", "Success!");
                        Cart.cart.clearItems();
                    }
                });
            };

            $scope.removeCoupon = function () {
                $scope.coupon = {};
            };

            $scope.checkCoupon = function (code, cartValue) {
                Coupon.find.query({code: code, cartValue: cartValue}, function (res) {
                    $scope.coupon = res[0];
                });
            };
            $scope.$watch(function (Cart) {
                return Cart.cart.getTotalPrice();
            }, function (newValue, oldValue) {
                $scope.checkCoupon($scope.couponCode, newValue);
            }
            );
        });
