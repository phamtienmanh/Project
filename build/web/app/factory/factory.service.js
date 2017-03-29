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

  .factory('Shipping', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('api/shippings/:id', null, {'update': { method:'PUT' } });
    obj.best = $resource('api/shippings/best', null, {'update': { method:'PUT' }});
    return obj;
  }])

  .factory('SortOptions', [function() {
    var obj = {};
    obj.server= [
       {name:'Low Price', val:{'col': 'price', 'val': 'ASC'}},
       {name:'Hight Price', val:{'col': 'price', 'val':'DESC'}},
       {name:'Name (A-Z)', val:{'col': 'name', 'val':'ASC'}},
       {name:'Name (Z-A)', val:{'col': 'name','val':'DESC'}}
    ];
    obj.client= [
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
    return $resource('api/coupons/:id', null, {'update': { method:'PUT' } });
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
    return $resource('api/customers/:id', null, {'update': { method:'PUT' } });
  }])
  .factory('Setting', ['$resource', function($resource) {
    return $resource('api/settings/:id', null, {'update': { method:'PUT' } });
  }])
  .factory('Order', ['$resource', function($resource) {
    var obj = {};
    obj = $resource('api/orders/:id', null, {'update': { method:'PUT' } });
    obj.my = $resource('api/orders/my', null, {'update': { method:'PUT' }});
    obj.status = [
      {name:'Pending Payment', val:402},
      {name:'Order Placed', val:201},
      {name:'Order Accepted', val:202},
      {name:'Order Executed', val:302},
      {name:'Shipped', val:200},
      {name:'Delivered', val:200},
      {name:'Cancelled', val:204},
      {name:'Not in Stock', val:404}
    ];
    return obj;
  }]);
