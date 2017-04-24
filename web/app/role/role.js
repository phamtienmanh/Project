'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('role', {
        title: 'Add, Remove, Edit roles',
        url: '/role',
        templateUrl: 'app/role/role.html',
        controller: 'RoleCtrl',
        authenticate: true
      });
  });
