'use strict';

angular.module('shopnxApp')
  .controller('StatisticsCtrl', function ($rootScope, $scope, Auth ,Order, Category ) { //, socket, Category, Modal, toastr
//  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // Lấy tất cả các tháng
  $scope.datepickerOptions = {
    datepickerMode:"'year'",
    minMode:"'year'",
    minDate:"minDate",
    showWeeks:"false"
 };
      
  $scope.labels = moment.months();
  $scope.series = ['USD'];
//  $scope.colors = ['#AA0000', '#00AA00'];
  $scope.colors = [{
    backgroundColor: '#A2DED0',
    borderColor: '#00AA00',
    hoverBackgroundColor: '#AA0000',
    hoverBorderColor: '#00AA00',
    borderWidth: 1,
    hoverBorderWidth: 2
}];
    $scope.options1 = { 
      title: { display: true, text: 'Legend', position: 'bottom', padding: 5 }, 
      legend: { display: true, position: 'bottom', padding: 5 } 
    };

  $scope.data = [[0, 0, 0, 0, 0, 0, 0,0,0,0,0,0]];
//    [28, 48, 40, 19, 86, 27, 90]
  
//    $scope.dt1 = moment().startOf('month').subtract(7, "days")._d;
  $scope.dt1 = moment().startOf('year')._d;
  $scope.dt2 = moment($scope.dt1).endOf('year')._d;
  $scope.today = moment().endOf('day')._d;
  $scope.orders = {};
  
  $scope.getDayClass = function (date, mode) {
      $scope.dt2 = moment($scope.dt1).endOf('year')._d;
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
//        $scope.loadOrders();
        
  $scope.labels2 = [];
  $scope.data2 = [] ;
  $scope.colors2 = [{
    backgroundColor: '#A2DED0',
    borderColor: '#00AA00',
    hoverBackgroundColor: '#AA0000',
    hoverBorderColor: '#00AA00',
    borderWidth: 1,
    hoverBorderWidth: 2
}];
  $scope.options2 = { 
    title: { display: true, text: 'Legend', position: 'bottom', padding: 5 }, 
    legend: { display: true, position: 'bottom', padding: 5 } ,
    tooltips: {
        enabled: true,
        mode: 'single',
        callbacks: {
            label: function(tooltipItem, data) {
            var label = data.labels[tooltipItem.index];
            var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return label + ': ' + datasetLabel + '%';
            }
        }
    }
  };
  $scope.orders2 = {};
  $scope.categories = {};
  $scope.getCategories = function(){
        $scope.labels2.length = 0;
        $scope.data2.length = 0 ;
        $scope.categories = {};
        $scope.categories = Category.query({}, function(data){
        angular.forEach(data, function(value, key) {
        $scope.labels2.push(value.name);
        $scope.data2.push(0);
        });
    });
  };
  
  $scope.loadOrders2 = function () {
    $scope.getCategories();
    $scope.dt2 = moment($scope.dt1).endOf('year')._d;
    if ($rootScope.isAdmin() == true) {
        $scope.orders2 = Order.alldelivered.query({from: moment($scope.dt1).startOf('day').unix(), to: moment($scope.dt2).endOf('day').unix()}, function (res) {
            var total = 0;
            var countProduct = 0;
            for (var i = 0; i < res.length; i++) {
                var subTotal = 0;
                for (var j = 0; j < res[i].orderDetailCollection.length; j++) {
                    countProduct++;
                    subTotal += res[i].orderDetailCollection[j].productId.price * parseInt(res[i].orderDetailCollection[j].quantity);
                    total += res[i].orderDetailCollection[j].productId.price * parseInt(res[i].orderDetailCollection[j].quantity);
                    var index = $scope.labels2.indexOf(res[i].orderDetailCollection[j].productId.categoryId.name);
                    $scope.data2[index] = parseInt($scope.data2[index] + 1) ;
                }
                res[i].subTotal = subTotal;
            }
            res.total = total;
            for (var i = 0, max = $scope.data2.length; i < max; i++) {
                // Biểu đồ tròn nên lấy % dựa trên tổng số sản phẩm của order, làm tròn 2 số thập phân
                $scope.data2[i] = Math.round((parseInt($scope.data2[i]) / countProduct)*100)  ;
            }
        });
    }
};
//        $scope.loadOrders2();  
                
    $scope.popup1 = {
            opened: false
                };
    $scope.popup2 = {
            opened: false
                };
                
    $scope.loadOrdersAll = function(){
        $scope.loadOrders();  
        $scope.loadOrders2();  
    };
    $scope.loadOrdersAll();
    
    $scope.chart1 = {
      show: true  
    };
    
    $scope.chart2 = {
      show: false  
    };
    
    $scope.showChart = function(chart){
        switch (chart){
            case 'chart1':
                $scope.chart1.show=true;
                $scope.chart2.show=false;
                break;
            case 'chart2':
                $scope.chart1.show=false;
                $scope.chart2.show=true;
                break;
            default:    
                $scope.chart1.show=true;
                $scope.chart2.show=false;
                break;
        }
    };
    
  });
