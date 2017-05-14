'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('coupon', {
        title: 'Coupons administration',
        url: '/coupon',
        templateUrl: 'app/coupon/coupon.html',
        controller: 'CouponCtrl',
        authenticate: true
      });
  });
