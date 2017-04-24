'use strict';

angular.module('shopnxApp')
  .controller('CheckoutCtrl', function ($scope, Order, PaymentMethod, Shipping, Coupon, Country, Auth) {
      $scope.msg = 'No items in cart. Shop Now';
      $scope.customer = Auth.getCurrentUser();
      $scope.coupon = {};

      $scope.placeOrder = function(cart){
        var data = {customerId: $scope.customer, items:cart};
        Order.save(data);
        $scope.msg = 'Processing Payment ...';
      };

      $scope.removeCoupon = function(){
        $scope.coupon = {};
      };
      
      $scope.checkCoupon = function(code, cartValue){
        Coupon.query({code: code, cartValue: cartValue}, function(res){
          $scope.coupon = res[0];
        });
      };
  });
