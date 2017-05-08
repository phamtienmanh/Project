'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('wishlist', {
        title: 'Wishlist administration',
        url: '/wishlist',
        templateUrl: 'app/wishlist/wishlist.html',
        controller: 'WishlistCtrl',
        authenticate: true
      });
  });