'use strict';

angular.module('shopnxApp')
        .factory('Modal', ['$rootScope', '$modal', '$q', function ($rootScope, $modal, $q) {

                var obj = {};
                var selectModalInstanceCtrl = function ($scope, $modalInstance, $injector, data, options, toastr, Category, Role, Auth, UploadImage) {
                    var api = $injector.get(options.api);
                    $scope.showPassword = false;
                    $scope.data = angular.copy(data);
                    $scope.options = options;
                    $scope.categories = Category.query(function () {
                    });
                    $scope.roles = Role.query(function () {
                    });
                    $scope.saveItem = function (item) {
                        $scope.uploadImage($scope.theFile);
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
                            if ($scope.theFile) {
                                if ($scope.theFile.type !== "image/png" && $scope.theFile.type !== "image/jpeg" && $scope.theFile.type !== "image/bmp") {
                                    $scope.imgTypeError = true;
                                    $scope.data.image = "";
                                }
                                else {
                                    $scope.imgTypeError = false;
                                    // gắn img vào product.image
                                    $scope.data.image = $scope.theFile.name;
                                    var reader = new FileReader();
                                    reader.onload = function (e) {
                                        $('#showImg2').attr('src', e.target.result);
                                    }
                                    reader.readAsDataURL($scope.theFile);
                                }
                            }
                        });
                    };
                    $scope.uploadImage = function (file) {
                        if (file) {
                            file.location = document.location.pathname.substring(1, document.location.pathname.indexOf('/', 2));
                            var fd = new FormData();
                            fd.append('file', file);
                            fd.append('location', file, document.location.pathname.substring(1, document.location.pathname.indexOf('/', 2)));
                            $scope.upload = UploadImage.save(fd, function () {
//                        toastr.success("Image upload successfully", "Success!");
                            }, function (error) {
                                toastr.error("Image upload error", "Error!");
                            });
                        }
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.data.fromDate = moment($scope.data.fromDate)._d || moment().startOf('day')._d;
                    $scope.data.toDate = moment($scope.data.toDate)._d || moment().endOf('day').add(7, "days")._d;
                    $scope.today = moment().startOf('day')._d;
                    $scope.getDayClass = function (date, mode) {
                        if (mode === 'day') {
                            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
                            var currentDay1 = new Date($scope.data.fromDate).setHours(0, 0, 0, 0);
                            var currentDay2 = new Date($scope.data.toDate).setHours(0, 0, 0, 0);
                            if (dayToCheck === currentDay1 && currentDay1 === currentDay2) {
                                return 'samedate';
                            }
                            if (dayToCheck === currentDay1) {
                                return 'datetime1';
                            }
                            if (dayToCheck === currentDay2) {
                                return 'datetime2';
                            }
                        }
                        return '';
                    };
                    $scope.popup1 = {
                        opened: false
                    };
                    $scope.popup2 = {
                        opened: false
                    };
                };

                // We need to manually inject to be minsafe
                selectModalInstanceCtrl.$inject = ['$scope', '$modalInstance', '$injector', 'data', 'options', 'toastr', 'Category', 'Role', 'Auth', 'UploadImage'];

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
