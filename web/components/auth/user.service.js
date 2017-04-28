'use strict';

angular.module('shopnxApp')
  .factory('User', function ($resource) {
    return $resource('api/customer/changePassword', {
//      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          id: '@_id',
          password: 'password' 
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
          
  });
