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
                        var colData= {text: 'Product Name', style: 'tableHeader' ,  alignment:'left' };
                        col.push(colData);
                    }
                    else if (columns[i]=='quantity') {
                        var colData= {text: 'Quantity', style: 'tableHeader' ,  alignment:'right' };
                        col.push(colData);
                    } 
                    else if (columns[i]=='price') {
                        var colData= {text: 'Price', style: 'tableHeader' ,  alignment:'right' };
                        col.push(colData);
                    } 
                    else if (columns[i]=='amount') {
                        var colData= {text: 'Amount', style: 'tableHeader' ,  alignment:'right' };
                        col.push(colData);
                    } 
            }
            body.push(col);

            data.forEach(function(row) {
                var dataRow = [];

                columns.forEach(function(column) {
                    var colValue = row[column].toString(); // column data
                    // Edit column style
                    var col= {text: colValue, style: 'normalText' , alignment:'left' };
                    if (column=='name') {
                    }
                    else if (column=='quantity') {
                        col= {text: colValue, style: 'normalText' , alignment:'right' };
                    } 
                    else if (column=='price') {
                        col= {text: colValue, style: 'normalText' , alignment:'right' };
                    } 
                    else if (column=='amount') {
                        col= {text: colValue, style: 'normalText' , alignment:'right' };
                    } 
                    dataRow.push(col);
                });
                

                body.push(dataRow);
            });

            return body;
        }

        function table(data, columns) {
            return {
                table: {
                    alignment: 'center',
                    widths: ['70%','10%','10%','10%'],
                    headerRows: 1,
                    body: buildTableBody(data, columns),
                    
                },
                layout: 'lightHorizontalLines' 
            };
        }
        var dataOrder = [];
        var dataColumns = [];
        var totalAmount = 0;
        var coupon = {code: 'No code' , amount: 0};
        var status = '';
        var total = 0;
        var discount = 0;
        var customer = {};
        for (var i = 0; i < order.orderDetailCollection.length; i++) {
            var item = order.orderDetailCollection[i].productId;
            var quantity = order.orderDetailCollection[i].quantity;
            var amount = quantity*item.price;
            if (order.couponId) {
                coupon = order.couponId;
            }
            status = order.status ;
            customer = order.customerId;
            var row = {name: item.name, quantity: quantity, price: item.price, amount: amount};
            dataOrder.push(row);
            totalAmount += parseFloat(amount);
            totalAmount = Math.round(parseFloat(totalAmount)* 100 )/100;
            
        }
        discount = (totalAmount*coupon.amount)/100 ;
        total = totalAmount - discount ;
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
                
                {text: 'THANK YOU', style: 'header', alignment:'center' },
                {text: 'Customer Information ' , style: 'subheader' , alignment:'left' , italics: 'true'},
                {text: 'Name: ' + customer.name , style: 'normalText' ,  alignment:'left'},
                {text: 'Phone: ' + customer.phone  , style: 'normalText' , alignment:'left'},
                {text: 'Shipping Address: ' + customer.address  , style: 'normalText' , alignment:'left'},
                {text: '\n' },
                {text: 'Order #'+   order.id.toString().substring(0,7),  style: 'subheader' },
                
                    
                table(dataOrder,  ['name', 'quantity', 'price', 'amount']),
                {text: '\n' },
                {
                    table: {
                        alignment: 'center',
                        widths: ['100%'],
                        body: [
                            // row 1
                            [
                                {text: 'Total Amount: $' + totalAmount , style: 'normalText' , alignment:'right'}
                            ],
                            // row 2
                            [
                                {text: 'Coupon: ' + coupon.code + ' - Discount: ' + coupon.amount + '% - $' + discount , style: 'normalText' , alignment:'right'}
                            ],
                            // row 3
                            [
                                {text: 'Total Amount After Discount: $' + total, style: 'normalText' , alignment:'right'}
                            ]
                        ]
                    },
                    layout: 'noBorders' ,
                },
                {text: '\n\n' },
                {text: '----------------- UNICORN BOOK STORE -----------------' , alignment:'center'},
//                {text: 'Status: ' + status, style: 'subheader', alignment:'right'},

            ],
            styles: {
		header: {
			fontSize: 30,
			bold: true,
                        italics: 'true' ,
			margin: [0, 0, 0, 10] ,
                        color: '#3C59AB'
		},
		subheader: {
			fontSize: 16,
			bold: true,
                        italics: 'true' ,
			margin: [0, 10, 0, 5] ,
                        color: '#32AB45' 
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
                        italics: 'true' ,
			fontSize: 13,
			color: '#6231AB'
		},
                normalText: {
                    color: 'black'
                }
            },
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
        
        
    

