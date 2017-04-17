'use strict';

angular.module('shopnxApp')
  .controller('ProductCtrl', function ($scope, socket, Product, Category, Brand, Feature, Modal, toastr) {
    var cols = [
      {heading:'name',dataType:'text', sortType:'lowercase'},
      {heading:'category',dataType:'text', sortType:'lowercase'},
      {heading:'author',dataType:'text', sortType:'lowercase'},
      {heading:'price',dataType:'text', sortType:'lowercase'},
      {heading:'image',dataType:'text', sortType:'lowercase'},
      {heading:'description',dataType:'text', sortType:'lowercase'},
      {heading:'quantity',dataType:'text', sortType:'lowercase'}
    ];
    // var cols = ['sku','name','nameLower','slug','status','info','uid', 'active','img'];
    $scope.products = [];
    $scope.product = null;
    
//    $scope.variant = {};
//    $scope.newFeature = {};
//    $scope.newKF = {};
//    $scope.product.variants = [];
//    $scope.product.features = [];
//    $scope.product.keyFeatures = [];
    // $scope.selected = {};
    // $scope.selected.feature = [];
//    $scope.features = Feature.query();
    // $scope.items=$scope.features.map(function(name){ return { key:key,val:val}; })
    // $scope.selected.feature[0] = {"key":"Fit","val":"Tight"};
    $scope.products = Product.query({}, function() {
      socket.syncUpdates('product', $scope.products);
    });

    $scope.categories = Category.query(function() {
      socket.syncUpdates('category', $scope.categories);
    });
//    $scope.brands = Brand.query(function() {
//      socket.syncUpdates('brand', $scope.brands);
//    });
    $scope.edit = function(product) {
      var title; if(product.name){ title = 'Editing ' + product.name;} else{ title = 'Add New';}
      Modal.show(product,{title:title, api:'Product', columns: cols});
    };
    $scope.save = function(product){
//      if('variants' in $scope.product){
//      }else{
//          $scope.product.variants = [];
//      }
//      if('keyFeatures' in $scope.product){
//      }else{
//          $scope.product.keyFeatures = [];
//      }
//      if('features' in $scope.product){
//      }else{
//          $scope.product.features = [];
//      }

//      if('size' in $scope.variant){
//        $scope.product.variants.push($scope.variant);
//        // console.log($scope.product.variants);
//      }
//      // console.log($scope.newKF);
//      if('val' in $scope.newKF){
//        $scope.product.keyFeatures.push($scope.newKF.val);
//        console.log($scope.product.keyFeatures);
//      }
//      if('key' in $scope.newFeature){
//        $scope.product.features.push($scope.newFeature);
//        // console.log($scope.product.features);
//      }
//      $scope.variant = {};
//      $scope.newKF = {};
//      $scope.newFeature = {};

      // $scope.feature.key = feature.key.name;
      // $scope.product.feature = $scope.selected.feature;

      // console.log($scope.selected.feature);
      if('id' in product){
          Product.update({ id:$scope.product.id }, $scope.product).$promise.then(function() {
            toastr.success("Product info saved successfully","Success!");
          }, function(error) { // error handler
            var err = error.data.errors;
            toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
          });
        }
        else{
          Product.save($scope.product).$promise.then(function() {
            toastr.success("Product info saved successfully","Success!");
          }, function(error) { // error handler
              var err = error.data.errors;
              toastr.error("Product info save error","Error!");
//              toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
          });
        }
    };
    $scope.delete = function(product){
        if('id' in product){
          Product.delete({ id:$scope.product.id }).$promise.then(function() {
            toastr.success("Product delete successfully","Success!");
            $scope.products = Product.query(); // get list product
            $scope.product = null; // set null
          }, function(error) { // error handler
            var err = error.data.errors;
            toastr.error("Product delete error","Error!");
//            toastr.error(err[Object.keys(err)].message,err[Object.keys(err)].name);
          });
        }
    };
    
    
    
    $scope.changeActive = function(b){ // success handler
      b.active = !b.active;
      Product.update({ id:b.id }, b).$promise.then(function() {

      }, function(error) { // error handler
          // console.log(error);
          toastr.error(error.statusText + ' (' +  error.status + ')');
          b.active = !b.active;
      });
    };

//    $scope.deleteFeature = function(index,product) {
//      $scope.product.features.splice(index, 1);
//      $scope.save(product)
//    };
//
//    $scope.deleteKF = function(index,product) {
//      $scope.product.keyFeatures.splice(index, 1);
//      $scope.save(product)
//    };
//
//    $scope.deleteVariants = function(index,product) {
//      $scope.product.variants.splice(index, 1);
//      $scope.save(product)
//    };

    $scope.productDetail = function(product){
        if(product){ $scope.product = product; }
        else{ $scope.product = null; }
    };

  });
