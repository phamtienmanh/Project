'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('wishlist', {
        title: 'Customer Wishlist',
        url: '/wishlist',
        templateUrl: 'app/wishlist/wishlist.html',
        controller: 'WishlistCtrl',
        authenticate: true
      });
  });