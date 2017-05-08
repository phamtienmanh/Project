'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('order', {
        title: 'Orders administration',
        url: '/order',
        templateUrl: 'app/order/order.html',
        controller: 'OrderCtrl',
        authenticate: true
      });
  });
