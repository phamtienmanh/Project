'use strict';

angular.module('shopnxApp')
        .controller('ProductCtrl', function ($scope, socket, Product, Category, UploadImage, Brand, Feature, Modal, toastr) {
            var cols = [
                {heading: 'name', dataType: 'text', sortType: 'lowercase'},
                {heading: 'category', dataType: 'selectCat', sortType: 'lowercase'},
                {heading: 'author', dataType: 'text', sortType: 'lowercase'},
                {heading: 'price', dataType: 'price', sortType: 'parseFloat'},
                {heading: 'image', dataType: 'image', sortType: 'lowercase'},
                {heading: 'description', dataType: 'text', sortType: 'lowercase'},
                {heading: 'quantity', dataType: 'quantity', sortType: 'parseFloat'}
            ];
            $scope.products = [];
            $scope.product = null;

            $scope.products = Product.query({}, function () {
                socket.syncUpdates('product', $scope.products);
            });

            $scope.categories = Category.query(function () {
                socket.syncUpdates('category', $scope.categories);
            });

            $scope.edit = function (product) {
                var title;
                if (product.id) {
                    title = 'Editing product ' + product.name;
                } else {
                    title = 'Add New  Product';
                }
                Modal.show(product, {title: title, api: 'Product', columns: cols}).then(function (data) {
                    if (data.id) {
                        var index = _.indexOf($scope.products, _.find($scope.products, {id: data.id}));
                        if (index != -1) {
                            //edit
                            $scope.products.splice(index, 1, data);
                        }
                        else {
                            //add new
                            $scope.products.push(data);
                        }
                    }
                });
            };
            $scope.save = function (product) {
                $scope.uploadImage($scope.theFile);
                if ('id' in product) {
                    Product.update({id: $scope.product.id}, $scope.product).$promise.then(function (resp) {
                        if (resp && resp.message) {
                            toastr.error(resp.message, "Error!");
                        }
                        else {
                            toastr.success("Product info saved successfully", "Success!");
                        }
                    }, function (error) { // error handler
                        toastr.error("Product info saved fail, try again", "Error!");
                    });
                }
                else {
                    Product.save($scope.product).$promise.then(function (resp) {
                        if (resp && resp.message) {
                            toastr.error(resp.message, "Error!");
                        }
                        else {
                            toastr.success("Product info added successfully", "Success!");
                        }
                    }, function (error) { // error handler
                        var err = error.data.errors;
                        toastr.error("Product info added fail, try again", "Error!");
                    });
                }
            };
            $scope.delete = function (product) {
                if ('id' in product) {
                    Product.delete({id: $scope.product.id}).$promise.then(function (resp) {
                        if (resp && resp.message) {
                            toastr.error(resp.message, "Error!");
                        }
                        else {
                            toastr.success("Product delete successfully", "Success!");
                            $scope.products = Product.query(); // get list product
                            $scope.product = null; // set null
                        }
                    }, function (error) { // error handler
                        var err = error.data.errors;
                        toastr.error("Product delete error", "Error!");
                    });
                }
            };
            //check img type, load img
            $scope.imgTypeError = false;
            $scope.getFile = function (element) {
                $scope.$apply(function ($scope) {
                    $scope.theFile = element.files[0];
                    if ($scope.theFile) {
                        $scope.imgType = $scope.theFile.name.substring($scope.theFile.name.lastIndexOf('.') + 1).toLowerCase();
                        if ($scope.theFile.type !== "image/png" && $scope.theFile.type !== "image/jpeg" && $scope.theFile.type !== "image/bmp") {
                            $scope.imgTypeError = true;
                            $scope.product.image = "";
                        }
                        else {
                            $scope.imgTypeError = false;
                            $scope.product.image = $scope.theFile.name;
                            var reader = new FileReader();
                            reader.onload = function (e) {
                                $('#showImg').attr('src', e.target.result);
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


            $scope.changeActive = function (b) { // success handler
                b.active = !b.active;
                Product.update({id: b.id}, b).$promise.then(function () {

                }, function (error) { // error handler
                    // console.log(error);
                    toastr.error(error.statusText + ' (' + error.status + ')');
                    b.active = !b.active;
                });
            };

            $scope.productDetail = function (product) {
                if (product) {
                    $scope.product = product;
                }
                else {
                    $scope.product = null;
                }
            };

        });
