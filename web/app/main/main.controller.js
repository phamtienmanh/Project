'use strict';

angular.module('shopnxApp')
  .controller('ProductDetailsCtrl', function ($scope, $rootScope, Product, Customer , Category, Wishlist, toastr , Auth , socket, $stateParams, $location, $state, $injector) {    
    var id = $stateParams.id;
    // Storing the product id into localStorage because the _id of the selected product which was passed as a hidden parameter from products won't available on page refresh
    if (localStorage !== null && JSON !== null && id !== null) {
        localStorage.productId = id;
    }
    var productId = localStorage.productId !== null ? localStorage.productId : null;

    $scope.product = Product.get({id:productId},function(data) {
      socket.syncUpdates('product', $scope.data);
      generateBreadCrumb('Category',data.categoryId.id);
    });
    $scope.categories = Category.all.query();
    // To shuffle throught different product variants
    $scope.i=0;
    $scope.changeIndex =function(i){
        $scope.i=i;
    };
    
    $scope.wishExisted = false;

    // Add to wish list
    $scope.addWishlist = function(){
        var u = Auth.getCurrentUser();
        Wishlist.save({
            id: 0,
            customerId: u,
            productId: $scope.product
        }).$promise.then(function (data){
            var result = data[0]+data[1]+data[2]+data[3];
            if (result=="true") { 
                // add success
//                alert('Add to wish list success');
//                toastr.success("Add to wish list success","Success!");
               $scope.wishExisted = $scope.getWishlist();
            }else {
                // add failed
            }
        });
    };
    
    // Check wish list exist
    $scope.getWishlist = function(){
        var u = Auth.getCurrentUser();
        var result = Wishlist.get( u.id, $scope.product.id );
        if (result!==null) {
            return true;
        }else{
            return false;
        }
    };
    // Remove wish list
    $scope.removeWishlist = function(){
        var u = Auth.getCurrentUser();
        $scope.wish = {};
        Wishlist.get( u.id, $scope.product.id ).$promise.then(function (data){
//            $scope.wish = data;
            alert(data.id);

        });
//        Wishlist.delete($scope.wish.id).$promise.then(function (data){
//            var result = data[0]+data[1]+data[2]+data[3];
//            if (result=="true") {
//                // delete success
////                alert('Add to wish list success');
////                toastr.success("Add to wish list success","Success!");
//               $scope.wishExisted = $scope.getWishlist();
//            }else {
//                // delete fail
//            }
//        });
    };
    
    $scope.wishExisted = $scope.getWishlist();

    // The main function to navigate to a page with some hidden parameters
    $scope.navigate = function(page,params){
      if(params){
        $location.replace().path(page+'/'+params.name+'/'+params.id);
      }else{
        $location.replace().path('/');
      }
    };
    $scope.goMain = function(cat){
        $state.go('main', {myCategory: cat});
    };

    // Function to generate breadcrumb for category and brand
    // Future: Put it inside a directive
    var generateBreadCrumb = function(page, id){
      $scope.breadcrumb = {};
      $scope.breadcrumb.items = [];
      var api = $injector.get(page);
      api.get({id:id}).$promise.then(function(child){
        $scope.breadcrumb.items.push(child);
        // var p = child.parent;
        // if(p != null){findBrandPath(1);}
        if(page==='Category'){
          $scope.breadcrumb.items.push({name:'All Categories'});
        }
      });
    };

  })

  .controller('MainCtrl', function ($scope, $state, $stateParams, $location, Product, Brand, Category, Feature, socket, $rootScope, $injector, $loading) {
    $scope.categories = Category.all.query();
// For Price slider
    $scope.currencyFormatting = function(value){
      return  '$ ' + value.toString();
    };

    $scope.removeCategory = function(cat){
        var index = $scope.fl.categories.indexOf(cat);
        if (index > -1) {
            $scope.fl.categories.splice(index, 1);
            $scope.filter();
        }
    }

    $scope.products = {};
    $scope.filtered = {};
    $scope.products.busy = false;
    $scope.products.end = false;
    $scope.products.after = 0;
    $scope.products.items = [];
    $scope.products.sort = {'col': 'price', 'val': 'ASC'};
    $scope.fl = {};
    $scope.fl.categories = [];
    if($stateParams.myCategory){
        $scope.myCategory = $stateParams.myCategory;
        $scope.fl.categories.push($stateParams.myCategory);
    }
    $scope.priceSlider = {};
    $scope.navigate = function(page,params){
      // var params = params.delete('$$hashKey');
      if(page==='sort'){
        delete params.$$hashKey;
        var paramString = JSON.stringify(params);
        // console.log(paramString);
        $state.go($state.current, {sort: paramString}, {reload: true});
      }
      else if(params){
        $location.replace().path(page+'/'+params.name+'/'+params.id);
      }else{
        $location.replace().path('/');
      }
    };
    var generateBreadCrumb = function(page, id){
      $scope.breadcrumb.items = [];
      var api = $injector.get(page);
      api.get({id:id}).$promise.then(function(child){
        $scope.breadcrumb.items.push(child);
        // var p = child.parent;
        // if(p != null){findBrandPath(1);}
        if(page==='Category'){
          $scope.breadcrumb.items.push({name:'All Categories'});
        }
      });
    };

    var sort = $stateParams.sort == null ? $scope.products.sort : $stateParams.sort;
    var q = {limit: 10};
    // displayProducts(q);
    $scope.filter = function(){ 
      var categoryIds = [];
      if ($scope.products.busy){ return; }
      $scope.products.busy = true;
      if($scope.fl.categories){
        if($scope.fl.categories.length>0){          
            angular.forEach($scope.fl.categories,function(category){
                if(category.id){
                    categoryIds.push(category.id);
                }
            });
        }
      }
      q.priceGreater = $scope.priceSlider.min;
      q.priceLower = $scope.priceSlider.max;
      q.categoryIds = categoryIds;
      
      // console.log(f,q);
      displayProducts(q,true);
    };

    $scope.sortNow = function(sort){
        $scope.products.sort = sort;
        q.sortColumn = sort.col;
        q.sortValue = sort.val;
        displayProducts(q,true);
    };

    var displayProducts = function(q,flush){
      if(flush){
        q.skip = 0;
        $scope.products.items = [];
        $scope.products.end = false;
        $scope.products.after = 0;
      }
      $loading.start('products');
      $scope.products.busy = true;
      Product.all.query(q, function(data){
          for (var i = 0; i < data.length; i++) {
              $scope.products.items.push(data[i]);
          }
          $scope.filtered.count = data.length + $scope.products.after;
          if(data.length>=5) { $scope.products.after = $scope.products.after + data.length; } else { $scope.products.end = true;}
          $scope.products.busy = false;
          $loading.finish('products');
      }, function(){ $scope.products.busy = false; $loading.finish('products');});

      Product.count.query(q, function(res){
        $scope.products.count = res[0].count;
      });
    };

    $scope.resetPriceRange = function(){
      $scope.priceSlider = {
          min: 0,
          max: 100,
          ceil: 100,
          floor: 0
      };
      $scope.filter();
    };

    if('page' in $stateParams){
      var categoryId;
      if($stateParams.page && $stateParams.id){
        $scope.breadcrumb = {type: $stateParams.page};
        generateBreadCrumb($stateParams.page,$stateParams.id);
        if($stateParams.page==='Category'){
          // categoryId = $stateParams._id;
          $scope.fl.categories.push({id:$stateParams.id,name:$stateParams.name});
        }
        $scope.resetPriceRange();
      }else{
        q = {sortColumn: sort.col, sortValue: sort.val, limit:10};
      }
      $scope.filter();
    }else{
      q = {sortColumn: sort.col, sortValue: sort.val, limit:10};
    }

    $scope.scroll = function() {
        if ($scope.products.busy || $scope.products.end){ return;}
        $scope.products.busy = false;
        q.skip = $scope.products.after;
        displayProducts(q);
    };


    $scope.resetPriceRange();

});
