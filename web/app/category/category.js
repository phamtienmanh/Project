'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('category', {
        title: 'Categories administration',
        url: '/category',
        templateUrl: 'app/category/category.html',
        controller: 'CategoryCtrl',
        authenticate: true,
        isAdmin: true
      });
  });
