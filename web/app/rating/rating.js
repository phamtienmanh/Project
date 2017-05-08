'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('rating', {
        title: 'Rating administration',
        url: '/rating',
        templateUrl: 'app/rating/rating.html',
        controller: 'RatingCtrl',
        authenticate: true
      });
  });