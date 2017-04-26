'use strict';

angular.module('shopnxApp')
.value('redirectToUrlAfterLogin', { url: '/' })
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q, redirectToUrlAfterLogin) {
    var currentUser = {};
    if($cookieStore.get('token')) {
//      currentUser = User.get();
      currentUser = $cookieStore.get('token');
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('api/customer/login', {
          email: user.email,
          password: user.password
        }).
        then(function onSuccess(response) {
            $cookieStore.put('token', response.data);
            currentUser = response.data;
            deferred.resolve(response);
            return cb();
        }).catch(function onError(err) {
            this.logout();
            deferred.reject(err);
            return cb(err);
        });
        return deferred.promise;
    },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },
      saveAttemptUrl: function() {
        if($location.path().toLowerCase() !== '/login' || $location.path().toLowerCase() !== '/signup') {
          redirectToUrlAfterLogin.url = $location.path();
        }
        else {
          redirectToUrlAfterLogin.url = '/';
        }
      },
      redirectToAttemptedUrl: function() {
        $location.path(redirectToUrlAfterLogin.url);
      },
      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('api/customer/create', user).
            then(function onSuccess(response) {
                $cookieStore.put('token', response.data);
                currentUser = response.data;
                deferred.resolve(response);
                return cb();
            }).catch(function onError(err) {
                this.logout();
                deferred.reject(err);
                return cb(err);
            });
        return deferred.promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser.id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('roleId');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        if(currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function() {
            cb(true);
          }).catch(function() {
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('roleId')) {
          cb(true);
        } else {
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.roleId ? currentUser.roleId.name === 'admin' : false;
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }
    };
  });
