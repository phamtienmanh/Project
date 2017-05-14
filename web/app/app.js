'use strict';

angular.module('shopnxApp', [
    'ngCookies',
    'ngResource',
    'ngAnimate',
    'toastr',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'tableSort',
    'checklist-model',
    'rzModule',
    'infinite-scroll',
    'darthwade.dwLoading',
    'angularMoment',
    'ui.select',
    'chart.js'
]).constant('_', window._)
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $qProvider) {
            $urlRouterProvider
                    .otherwise('/');
            $locationProvider.html5Mode(true);
            $httpProvider.interceptors.push('authInterceptor');
            $qProvider.errorOnUnhandledRejections(false);
        })

        .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
            return {
                // Add authorization token to headers
                request: function (config) {
                    config.headers = config.headers || {};
                    if ($cookieStore.get('token')) {
                        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                    }
                    return config;
                },
                // Intercept 401s and redirect you to login
                responseError: function (response) {
                    if (response.status === 401) {
                        $location.path('/login');
                        // remove any stale tokens
                        $cookieStore.remove('token');
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }
            };
        })

        .run(function ($rootScope, Auth, $state, toastr) {
            // Redirect to login if route requires auth and you're not logged in
            $rootScope.$on('$stateChangeStart', function (event, next) {
                Auth.isLoggedInAsync(function (loggedIn) {
                    if (next.authenticate && !loggedIn) {
                        event.preventDefault();
                        Auth.saveAttemptUrl();
                        $state.go('login');
                    }
                    else if (next.isAdmin && !Auth.isAdmin()) {
                        event.preventDefault();
                        $state.go('main');
                        toastr.error('You dont have permission!','Error')
                    }
                });
            });

            $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
                window.document.title = toState.title + ' - BookStore';
            });

            $rootScope.spinner = {
                active: false,
                on: function () {
                    this.active = true;
                },
                off: function () {
                    this.active = false;
                }
            };
        });

// .run(run);
// run.$inject = ['$rootScope'];
// function run ($rootScope) { // The function to display a loading spinner on ajax request
//
// }
