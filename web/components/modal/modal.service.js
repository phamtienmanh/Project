'use strict';

angular.module('shopnxApp')
        .factory('Modal', ['$rootScope', '$modal', '$q', function ($rootScope, $modal, $q) {

                var obj = {};
                var selectModalInstanceCtrl = function ($scope, $modalInstance, $injector, data, options, toastr, Category) {
                    var api = $injector.get(options.api);
                    $scope.showPassword = false;
                    $scope.data = angular.copy(data);
                    $scope.options = options;
                    $scope.categories = Category.query(function () {
                    });
                    $scope.roles = ['admin', 'user'];
                    $scope.saveItem = function (item) {
                        if ($scope.data.id) {
                            //edit
                            api.update({id: $scope.data.id}, $scope.data).$promise.then(function (data) {
                                if (data && data.message) {
                                    toastr.error(data.message, "Error!");
                                }
                                else {
                                    toastr.success($scope.options.api + " info saved successfully", "Success!");
                                    $modalInstance.close(data);
                                }
                            }, function (error) { // error handler
                                if (error.data.errors) {
                                    var err = error.data.errors;
                                    toastr.error(err[Object.keys(err)].message, err[Object.keys(err)].name);
                                }
                                else {
                                    var msg = error.data.message;
                                    toastr.error(msg);
                                }
                            });
                        }
                        else {
                            //add new
                            api.save($scope.data).$promise.then(function (data) {
                                if (data && data.message) {
                                    toastr.error(data.message, "Error!");
                                }
                                else {
                                    toastr.success($scope.options.api + " added successfully", "Success!");
                                    $modalInstance.close(data);
                                }
                                $modalInstance.close(resp);
                            }, function (error) { // error handler
                                if (error.data.errors) {
                                    var err = error.data.errors;
                                    toastr.error(err[Object.keys(err)].message, err[Object.keys(err)].name);
                                }
                                else {
                                    var msg = error.data.message;
                                    toastr.error(msg);
                                }
                            });
                        }
                    };
                    $scope.imgTypeError = false;
                    $scope.getFile = function (element) {
                        $scope.$apply(function ($scope) {
                            $scope.theFile = element.files[0];
                            if($scope.theFile){
                                if ($scope.theFile.type !== "image/png" && $scope.theFile.type !== "image/jpg" && $scope.theFile.type !== "image/bmp") {
                                    $scope.imgTypeError = true;
                                    $scope.data.image = "";
                                }
                                else {
                                    $scope.imgTypeError = false;
                                    // gắn img vào product.image
                                    $scope.data.image = $scope.theFile.name;
                                }
                            }
                        });
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                };

                // We need to manually inject to be minsafe
                selectModalInstanceCtrl.$inject = ['$scope', '$modalInstance', '$injector', 'data', 'options', 'toastr', 'Category'];

                obj.show = function (data, options) {
                    var deferred = $q.defer();
                    var modalOptions = {
                        templateUrl: 'components/modal/modal.html',
                        controller: selectModalInstanceCtrl,
                        controllerAs: 'modal',
                        windowClass: 'modal-danger',
                        resolve: {
                            data: function () {
                                return data;
                            },
                            options: function () {
                                return options;
                            }
                        }
                    };
                    $modal.open(modalOptions).result.then(function (data) {
                        deferred.resolve(data);
                    }, function () {
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                };

                return obj;

            }]);
