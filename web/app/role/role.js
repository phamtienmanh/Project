'use strict';

angular.module('shopnxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('role', {
        title: 'Roles administration',
        url: '/role',
        templateUrl: 'app/role/role.html',
        controller: 'RoleCtrl',
        authenticate: true,
        isAdmin: true
      });
  });
