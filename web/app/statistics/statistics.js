'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('statistics', {
        title: 'Statistics',
        url: '/statistics',
        templateUrl: 'app/statistics/statistics.html',
        controller: 'StatisticsCtrl',
        authenticate: true
      });
  });