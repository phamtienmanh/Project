'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rating', {
        title: 'Product Rating',
        url: '/rating',
        templateUrl: 'app/rating/rating.html',
        controller: 'RatingCtrl',
        authenticate: true
      });
  });