'use strict';

angular.module('shopnxApp')
  .controller('OrderCtrl', ['$rootScope', '$scope', 'Auth', 'Order', 'toastr', function ($rootScope, $scope, Auth, Order, toastr) {
    $scope.dt1 = moment().startOf('day').subtract(7, "days")._d;
    $scope.dt2 = moment().endOf('day')._d;
    $scope.today = moment().endOf('day')._d;
    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);
            var currentDay1 = new Date($scope.dt1).setHours(0,0,0,0);
            var currentDay2 = new Date($scope.dt2).setHours(0,0,0,0);
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
  
    $scope.orderStatusLov = Order.status;
    $scope.loadOrders = function(){
        if($rootScope.isAdmin() == true){
            $scope.orders = Order.all.query({from: moment($scope.dt1).startOf('day').unix(), to:  moment($scope.dt2).endOf('day').unix()},function(res){
            var total=0;
            for(var i=0;i<res.length;i++){
                var subTotal = 0;
                for(var j=0;j<res[i].items.length;j++){
                    subTotal += res[i].items[j].productId.price * parseInt(res[i].items[j].quantity);
                    total += res[i].items[j].productId.price * parseInt(res[i].items[j].quantity);
                }
                res[i].subTotal = subTotal;
            }
            res.total = total;
            });
        }
        else{
            $scope.orders = Order.my.query({customerId: Auth.getCurrentUser().id, from: moment($scope.dt1).startOf('day').unix(), to:  moment($scope.dt2).endOf('day').unix()},function(res){
            var total=0;
            for(var i=0;i<res.length;i++){
                var subTotal = 0;
                for(var j=0;j<res[i].items.length;j++){
                    subTotal += res[i].items[j].productId.price * parseInt(res[i].items[j].quantity);
                    total += res[i].items[j].productId.price * parseInt(res[i].items[j].quantity);
                }
                res[i].subTotal = subTotal;
            }
            res.total = total;
            });
        }
    }
    $scope.loadOrders();
    
    $scope.changeStatus = function(order){
      Order.changeStatus.update(order.productOrder).$promise.then(function(res) {
          toastr.success("Order's status updated successfully","Success!");
      }, function(error) { // error handler
        toastr.error("Order's status updated fail","Error!");
        if(error.data.errors){
          var err = error.data.errors;
          toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
        }
        else{
          var msg = error.data.message;
          toastr.error(msg);
        }
      });
    };
    
    $scope.popup1 = {
        opened: false
        };
    $scope.popup2 = {
        opened: false
        };
    
  }]);
