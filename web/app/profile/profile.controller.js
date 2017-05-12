'use strict';

angular.module('shopnxApp')
        .controller('ProfileCtrl', function ($scope, socket, Auth, Customer , Modal, toastr) {
            
            $scope.user = Auth.getCurrentUser();

            $scope.save = function (user) {
                if ('id' in user) {
                    Customer.update({id: $scope.user.id}, $scope.user).$promise.then(function (resp) {
                        if(resp && resp.message){
                             toastr.error(resp.message, "Error!");
                        }
                        else{
                            toastr.success("Profile saved successfully", "Success!");
                        }
                    }, function (error) { // error handler
                        toastr.error("Profile saved fail, try again", "Error!");
                    });
                }
                else {
                    Customer.save($scope.user).$promise.then(function (resp) {
                        if(resp && resp.message){
                             toastr.error(resp.message, "Error!");
                        }
                        else{
                            toastr.success("Profile added successfully", "Success!");
                        }
                    }, function (error) { // error handler
                        var err = error.data.errors;
                        toastr.error("Profile added fail, try again", "Error!");
                    });
                }
            };
            
           
        });
