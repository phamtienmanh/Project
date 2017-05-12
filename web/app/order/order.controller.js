'use strict';

angular.module('shopnxApp')
    .controller('OrderCtrl', ['$rootScope', '$scope', 'Auth', 'Order', 'toastr', 'PdfService', '$timeout' , function ($rootScope, $scope, Auth, Order , toastr, PdfService, $timeout ) {
            $scope.dt1 = moment().startOf('day').subtract(7, "days")._d;
            $scope.dt2 = moment().endOf('day')._d;
            $scope.today = moment().endOf('day')._d;
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

            $scope.orderStatusLov = Order.status;
            $scope.loadOrders = function () {
                if ($rootScope.isAdmin() == true) {
                    $scope.orders = Order.all.query({from: moment($scope.dt1).startOf('day').unix(), to: moment($scope.dt2).endOf('day').unix()}, function (res) {
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
            }
            $scope.loadOrders();

            $scope.changeStatus = function (order) {
                Order.changeStatus.update(order).$promise.then(function (data) {
                    if (data && data.message) {
                        toastr.error(data.message, "Error!");
                    }
                    else {
                        toastr.success("Order's status updated successfully", "Success!");
                    }
                }, function (error) { // error handler
                    toastr.error("Order's status updated fail", "Error!");
                    if (error.data.errors) {
                        var err = error.data.errors;
                        toastr.error(err[Object.keys(err)].message, err[Object.keys(err)].name);
                    }
                    else {
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
                
    $scope.export = function(order){
        function buildTableBody(data, columns) {
            var body = [];
            var col = [];
            for (var i = 0, max = columns.length; i < max; i++) {
                    if (columns[i]=='name') {
                        col.push('Product Name');
                    }
                    else if (columns[i]=='quantity') {
                        col.push('Quantity');
                    } 
                    else if (columns[i]=='price') {
                        col.push('Price');
                    } 
                    else if (columns[i]=='amount') {
                        col.push('Amount');
                    } 
            }
            body.push(col);

            data.forEach(function(row) {
                var dataRow = [];

                columns.forEach(function(column) {
                    dataRow.push(row[column].toString());
                });
                

                body.push(dataRow);
            });

            return body;
        }

        function table(data, columns) {
            return {
                table: {
                    alignment: 'center',
                    width: ['25%','25%','25%','25%'],
                    headerRows: 1,
                    body: buildTableBody(data, columns),
                    
                }
            };
        }
        var dataOrder = [];
        var dataColumns = [];
        var totalPrice = 0;
        var coupon = {};
        var status = '';
        var total = 0;
        for (var i = 0; i < order.orderDetailCollection.length; i++) {
            var item = order.orderDetailCollection[i].productId;
            var quantity = order.orderDetailCollection[i].quantity;
            var amount = quantity*item.price;
            coupon = order.couponId;
            status = order.status ;
            var row = {name: item.name, quantity: quantity, price: item.price, amount: amount};
            dataOrder.push(row);
            totalPrice += parseFloat(amount);
            totalPrice = Math.round(parseFloat(totalPrice)* 100 )/100;
            
        }
        total = totalPrice - (totalPrice*coupon.amount)/100 ;
        total = Math.round(parseFloat(total)* 100 )/100 ;
        
        var docDefinition = {
            info: {
                title: 'Order',
                author: '',
                subject: '',
                keywords: ''
            },   
            content: [
                { width: '*', text: '' },
                
                {text: 'THANK YOU', style: 'header', alignment:'center'},
                {text: 'Order #'+order.id, style: 'subheader'},
                
                    
                table(dataOrder,  ['name', 'quantity', 'price', 'amount']),
                
                {text: 'Discount: ' + coupon.amount + '%', style: 'subheader'},
                {text: 'Total Amount: $' + total, style: 'subheader'},
                {text: 'Status: ' + status, style: 'subheader'},

            ]
        };
        
        var docPdf = PdfService.create(docDefinition);
        var url = '';
        var getUrl = PdfService.dataUrl( docPdf, function( result ) {
            url = result;
        });
        
        $timeout(function(){
            PdfService.open( url );        
        });
    };

    }]);
        
        
    

