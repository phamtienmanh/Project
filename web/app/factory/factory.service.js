'use strict';
        angular.module('shopnxApp')
// Sample factory (dummy)
        .factory('factory', [function () {
        var somValue = 42;
                return {
                someMethod: function () {
                return somValue;
                }
                };
        }])
        .factory('Product', ['$resource', function($resource) {
        var obj = {};
                obj = $resource('api/products/:id', null, {'update': { method:'PUT' } });
                obj.count = $resource('api/products/count', null, {'update': { method:'PUT' }});
                obj.search = $resource('api/products/search', null, {'update': { method:'PUT' }});
                obj.all = $resource('api/products/all', null, {'update': { method:'PUT' }});
                return obj;
        }])

        .factory('UploadImage', ['$resource', function($resource) {
        var obj = {};
                obj = $resource('api/upload/', null, {'save': { method:'POST',transformRequest: angular.identity,headers: {'Content-Type': undefined}}});
                return obj;
        }])

        .factory('Wishlist', ['$resource', function($resource) {
        var obj = {};
                obj = $resource('api/wishlist/:id', null, {'update': { method:'PUT' } });
                obj.search = $resource('api/wishlist/search', null, {'update': { method:'PUT' }});
                obj.searchByCustomer = $resource('api/wishlist/searchByCustomer', null, {'update': { method:'PUT' }});
                return obj;
        }])

        .factory('Rating', ['$resource', function($resource) {
        var obj = {};
                obj = $resource('api/rating/:id', null, {'update': { method:'PUT' } });
                obj.count = $resource('api/rating/count', null, {'update': { method:'PUT' }});
                obj.search = $resource('api/rating/search', null, {'update': { method:'PUT' }});
                obj.searchByProduct = $resource('api/rating/searchbyproduct', null, {'update': { method:'PUT' }});
                obj.searchByCustomer = $resource('api/rating/searchByCustomer', null, {'update': { method:'PUT' }});
                obj.all = $resource('api/rating/all', null, {'update': { method:'PUT' }});
                return obj;
        }])

        .factory('MyRating', ['$resource', function($resource) {
        var obj = {};
                obj = $resource('api/rating/searchByCustomer', null, {'update': { method:'PUT' } });
                return obj;
        }])

        .factory('Statistics', ['$resource', function($resource) {
        var obj = {};
                obj = $resource('api/rating/:id', null, {'update': { method:'PUT' } });
                obj.count = $resource('api/rating/count', null, {'update': { method:'PUT' }});
                obj.search = $resource('api/rating/search', null, {'update': { method:'PUT' }});
                obj.all = $resource('api/rating/all', null, {'update': { method:'PUT' }});
                return obj;
        }])

        .factory('Shipping', ['$resource', function($resource) {
        var obj = {};
                obj = $resource('api/shippings/:id', null, {'update': { method:'PUT' } });
                obj.best = $resource('api/shippings/best', null, {'update': { method:'PUT' }});
                return obj;
        }])

        .factory('SortOptions', [function() {
        var obj = {};
                obj.server = [
                {name:'Low Price', val:{'col': 'price', 'val': 'ASC'}},
                {name:'Hight Price', val:{'col': 'price', 'val':'DESC'}},
                {name:'Name (A-Z)', val:{'col': 'name', 'val':'ASC'}},
                {name:'Name (Z-A)', val:{'col': 'name', 'val':'DESC'}}
                ];
                obj.client = [
                {name:'Price Asc', val:'price'},
                {name:'Price Desc', val:'price'},
                {name:'Name Asc', val:'name'},
                {name:'Name Desc', val:'-name'}
                ];
                return obj;
        }])

        .factory('Category', ['$resource', function($resource) {
        var obj = {};
                obj = $resource('api/category/:id', null, {'update': { method:'PUT' }});
                obj.parent = $resource('api/category/parent/:id', null, {'update': { method:'PUT' }});
                obj.all = $resource('api/category/all', null, {'update': { method:'PUT' }});
                return obj;
        }])
        .factory('Country', ['$resource', function($resource) {
        return $resource('api/countries/:id', null, {'update': { method:'PUT' } });
        }])
        .factory('Brand', ['$resource', function($resource) {
        return $resource('api/brand/:id', null, {'update': { method:'PUT' } });
        }])
        .factory('Coupon', ['$resource', function($resource) {
        var obj = {};
                obj = $resource('api/coupons/:id', null, {'update': { method:'PUT' } });
                obj.find = $resource('api/coupons/find', null, {'update': { method:'PUT' }});
                return obj;
        }])
        // .factory('Shipping', ['$resource', function($resource) {
        //   return $resource('api/shippings/:id', null, {'update': { method:'PUT' } });
        // }])
        .factory('Feature', ['$resource', function($resource) {
        var obj = {};
                obj = $resource('api/feature/:id', null, {'update': { method:'PUT' } });
                obj.group = $resource('api/feature/all', null, {'update': { method:'PUT' }});
                return obj;
        }])
        .factory('PaymentMethod', ['$resource', function($resource) {
        var obj = {};
                obj = $resource('api/PaymentMethods/:id', null, {'update': { method:'PUT' } });
                obj.active = $resource('api/PaymentMethods/active', null, {'update': { method:'PUT' }});
                return obj;
        }])
        .factory('Customer', ['$resource', function($resource) {
//    return $resource('api/customer/:id', null, {'update': { method:'PUT' } });
        var obj = {};
                obj = $resource('api/customer/:id', null, {'update': { method:'PUT' } });
                obj.changePassword = $resource('api/customer/changePassword', null, {'update': { method:'PUT' } });
                return obj;
        }])

        .factory('Setting', ['$resource', function($resource) {
        return $resource('api/settings/:id', null, {'update': { method:'PUT' } });
        }])
        .factory('Role', ['$resource', function($resource) {
        return $resource('api/roles/:id', null, {'update': { method:'PUT' } });
        }])
        .factory('Order', ['$resource', function($resource) {
        var obj = {};
                obj = $resource('api/orders/:id', null, {'update': { method:'PUT' } });
                obj.my = $resource('api/orders/my', null, {'update': { method:'PUT' }});
                obj.all = $resource('api/orders/all', null, {'update': { method:'PUT' }});
                obj.alldelivered = $resource('api/orders/alldelivered', null, {'update': { method:'PUT' }});
                obj.changeStatus = $resource('api/orders/changestatus', null, {'update': { method:'PUT' }});
                obj.status = ['Order Placed', 'Order Accepted', 'Shipped', 'Delivered', 'Cancelled'];
                return obj;
        }]);
