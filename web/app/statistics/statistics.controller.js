'use strict';

angular.module('shopnxApp')
  .controller('StatisticsCtrl', function ($rootScope, $scope, Auth ,Order) { //, socket, Category, Modal, toastr
//  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // Lấy tất cả các tháng
  $scope.datepickerOptions = {
    datepickerMode:"'year'",
    minMode:"'year'",
    minDate:"minDate",
    showWeeks:"false"
 };
      
  $scope.labels = moment.months();
  $scope.series = ['Total'];

  $scope.data = [[0, 0, 0, 0, 0, 0, 0,0,0,0,0,0]];
//    [28, 48, 40, 19, 86, 27, 90]
  
//    $scope.dt1 = moment().startOf('month').subtract(7, "days")._d;
  $scope.dt1 = moment().startOf('year')._d;
  $scope.dt2 = moment($scope.dt1).endOf('year')._d;
  $scope.today = moment().endOf('day')._d;
  $scope.orders = {};
  
  $scope.getDayClass = function (date, mode) {
                    if (mode === 'day') {
                        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
                        var currentDay1 = new Date($scope.dt1).setHours(0, 0, 0, 0);
                        var currentDay2 = new Date($scope.dt2).setHours(0, 0, 0, 0);
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
  
  $scope.loadOrders = function () {
    $scope.data = [[0, 0, 0, 0, 0, 0, 0,0,0,0,0,0]];
    $scope.dt2 = moment($scope.dt1).endOf('year')._d;

                    if ($rootScope.isAdmin() == true) {
                        $scope.orders = Order.alldelivered.query({from: moment($scope.dt1).startOf('day').unix(), to: moment($scope.dt2).endOf('day').unix()}, function (res) {
                            var total = 0;
                            for (var i = 0; i < res.length; i++) {
                                var subTotal = 0;
                                for (var j = 0; j < res[i].orderDetailCollection.length; j++) {
                                    subTotal += res[i].orderDetailCollection[j].productId.price * parseInt(res[i].orderDetailCollection[j].quantity);
                                    total += res[i].orderDetailCollection[j].productId.price * parseInt(res[i].orderDetailCollection[j].quantity);
                                }
                                res[i].subTotal = subTotal;
                                $scope.unformattedDate = res[i].date; // Lấy ngày order
                                $scope.formattedDate = moment($scope.unformattedDate).format('M'); // chuyển thành tháng dạng số
                                var index = parseInt($scope.formattedDate) - 1 ; // Index data = tháng - 1
                                $scope.data[0][index] = total; // Gắn tổng tiền vào data theo index

                            }
                            res.total = total;
//                            $scope.labels.push($scope.formattedDate) ;
//                            $scope.data.push(res.total) ;
                        });
                    }
                };
        $scope.loadOrders();
//        $scope.labels = $scope.orders.date.year;
                
    $scope.popup1 = {
            opened: false
                };
    $scope.popup2 = {
            opened: false
                };
    
  });
