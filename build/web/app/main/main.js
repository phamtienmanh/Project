'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        title: 'BookStore Project',
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        params: {
          sort: null
        }
      })
      .state('productDetail', {
        title: 'Details of selected product',
        params: {
          id: null,
          name: null
        },
        url: '/product/:id',
        templateUrl: 'app/main/product-details.html',
        controller: 'ProductDetailsCtrl'
      })
      .state('SubProduct', {
        title: 'All products under current category or brand',
        url: '/:page/:slug/:id',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        params: {
          id: null,
          sort: null,
          brand: null,
          category: null,
          price1: 0,
          price2: 100000
        }
      });
  });
