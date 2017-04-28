'use strict';

angular.module('shopnxApp')
  .factory('User', function ($resource) {
    return $resource('api/customer/changePassword', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
//          id: '@_id',
          password: '123' 
//          oldPassword:'@_oldPassword',
//          newPassword: '@_newPassword'
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
