'use strict';

angular.module('shopnxApp')
  .controller('StatisticsCtrl', function ($rootScope, $scope, Auth ,Order) { //, socket, Category, Modal, toastr
//  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.labels = [];
  $scope.series = ['Total'];

  $scope.data = [
//    [65, 59, 80, 81, 56, 55, 40],
//    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.dt1 = moment().startOf('day').subtract(7, "days")._d;
  $scope.dt2 = moment().endOf('day')._d;
  $scope.today = moment().endOf('day')._d;
  $scope.orders = {};
  $scope.loadOrders = function () {
                    if ($rootScope.isAdmin() == true) {
                        $scope.orders = Order.all.query({from: moment($scope.dt1).startOf('day').unix(), to: moment($scope.dt2).endOf('day').unix()}, function (res) {
                            var total = 0;
                            for (var i = 0; i < res.length; i++) {
                                var subTotal = 0;
                                for (var j = 0; j < res[i].orderDetailCollection.length; j++) {
                                    subTotal += res[i].orderDetailCollection[j].productId.price * parseInt(res[i].orderDetailCollection[j].quantity);
                                    total += res[i].orderDetailCollection[j].productId.price * parseInt(res[i].orderDetailCollection[j].quantity);
                                    $scope.data.push(subTotal) ;
                                    $scope.labels.push(res[i].date) ;
                                }
                                res[i].subTotal = subTotal;
                            }
                            res.total = total;
                        });
                    }
                    else {
                        $scope.orders = Order.my.query({customerId: Auth.getCurrentUser().id, from: moment($scope.dt1).startOf('day').unix(), to: moment($scope.dt2).endOf('day').unix()}, function (res) {
                            var total = 0;
                            for (var i = 0; i < res.length; i++) {
                                var subTotal = 0;
                                for (var j = 0; j < res[i].orderDetailCollection.length; j++) {
                                    subTotal += res[i].orderDetailCollection[j].productId.price * parseInt(res[i].orderDetailCollection[j].quantity);
                                    total += res[i].orderDetailCollection[j].productId.price * parseInt(res[i].orderDetailCollection[j].quantity);
                                }
                                res[i].subTotal = subTotal;
                            }
                            res.total = total;
                        });
                    }
                };
        $scope.loadOrders();
//        $scope.labels = $scope.orders.date.year;
                
  
  });
