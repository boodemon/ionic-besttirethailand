angular.module('thaibesttire.productControllers', [])

 /* Search Controller page 
  ---------------------------------------------------------------------------------------------------*/
 .controller('SearchController',function($scope,wdata,$http, $ionicLoading,$timeout,$state,$ionicHistory,shoppingCart){
		function loading(){
			$ionicLoading.show({
				template: 'Loading...'
			});	
		}
		loading();
		var uuid = window.localStorage['wsp_uuid'];
		var $user = wdata.dataUser(); //JSON.parse(window.localStorage['user']);

		$scope.imgstire = base_  + '/images/tyre';
		$scope.selected = {};
		$scope.selected.sort = 'name';

		$http.get( base_ + '/app/dimension').then(function(result){
			var $res = result.data;
			$scope.widths 	= $res.width;
			$scope.ratios 	= $res.ratio;
			$scope.rims 	= $res.rim;
			$ionicLoading.hide();
		},function(error){
			console.log('Error');
		});

		$scope.widthSelected = function(){
			loading();
			$http.get( base_ + '/app/dimension/change'
						+ '?&width=' 	+ ($scope.selected.vwidth 	!== undefined ? $scope.selected.vwidth 	: '' )
						+'&ratio=&rim=')
 /*
						+ '&ratio='  	+ ($scope.selected.vratio 	!== undefined ? $scope.selected.vratio 	: '')
						+'&rim=' 	+ ($scope.selected.vrim 	!== undefined ? $scope.selected.vrim 		: ''))
/*/
			.then(function(result){
				var $res = result.data;
				$scope.selected.vrim = '';
				$scope.selected.vratio = '';

				$scope.widths 	= $res.width;
				$scope.ratios 	= $res.ratio;
				$scope.rims 	= $res.rim;
				$ionicLoading.hide();
			},function(error){
				console.log('Error');
			});

		}

		$scope.onSelected = function(){
			loading();
			$http.get( base_ + '/app/dimension/change'
						+ '?rim=' 	+ ($scope.selected.vrim 	!== undefined ? $scope.selected.vrim 		: '')
						+ '&ratio=' 	+ ($scope.selected.vratio 	!== undefined ? $scope.selected.vratio 	: '')
						+ '&width=' 	+ ($scope.selected.vwidth 	!== undefined ? $scope.selected.vwidth 	: '' ))
			.then(function(result){
				var $res = result.data;
				$scope.widths 	= $res.width;
				$scope.ratios 	= $res.ratio;
				$scope.rims 	= $res.rim;
				$ionicLoading.hide();
			},function(error){
				console.log('Error');
			});
		}
	
	//:: Run on click result selected search :://
		function runSearch(){
			$ionicLoading.show({
				template: 'Loading...'
			});
			$http({
				method: "POST",
				url: base_ + "/app/product",
				data: {
					rim 	: $scope.selected.vrim 	 !== undefined ? $scope.selected.vrim : '',
					ratio 	: $scope.selected.vratio !== undefined ?  $scope.selected.vratio : '',
					width 	: $scope.selected.vwidth !== undefined ?  $scope.selected.vwidth : '',
					isfrom	: 'selectsearch',
					stock	: $scope.selected.vstock,
					qsort	: $scope.selected.sort,
					customer : $user.id,
					uuid 	 : window.localStorage['wsp_uuid']
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
			.then(function(result){
				console.log('result search : ' + result);
				var $sc = result.data;
				$scope.scResult = $sc;
				$scope.curDate =$sc.length > 0  ?  $sc[0].curDate : '';
				$ionicLoading.hide();
			},function(error){
				$ionicLoading.hide();
			  	console.log('Error : ' + error);
			});
		}

		$scope.onSort = function(){
			if($scope.scResult.length != 0){
				console.log('run selected sort');
				runSearch();
			}
		}
		$scope.doSC = function(){
			runSearch();
		};
		wdata.dataSet($scope);
		wdata.showProfile($scope);
 }) 

/* SEARCH BY KEY WORD
================================================================================================================*/
 .controller('KeywordsController',function($scope,wdata,$http, $ionicLoading,$timeout,$state,$ionicHistory,shoppingCart){
			$ionicLoading.show({
				template: 'Loading...'
			});
		var uuid = window.localStorage['wsp_uuid'];
		var $user = JSON.parse(window.localStorage['user']);
		$scope.goPage = function(page){
			$ionicHistory.nextViewOptions({
			  disableBack: true
			});
			$state.go(page);
		}

		$scope.searchData = {};
		$ionicLoading.hide();
		$scope.searchData.sort = 'name';
	//:: Run on click result Keyword search :://
		function runSearch(){
			$ionicLoading.show({
				template: 'Loading...'
			});
			console.log('keywords : ' + $scope.searchData.keywords );
			$http({
				method: "POST",
				url: base_ + "/app/product",
				data: {
					keywords: $scope.searchData.keywords ,
					stock	: $scope.searchData.stock ,
					isfrom	: 'keywords',
					qsort	: $scope.searchData.sort,
					customer : $user.id,
					uuid 	 : window.localStorage['wsp_uuid']
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
			.then(function(result){
					console.log('result search : ' + result);
					var $sc = result.data;
					console.log($sc);
					$scope.kwResult 	= $sc;
					$scope.curDate 	= $sc .length > 0 ? $sc[0].curDate : '';
					$ionicLoading.hide();
			},function(error){
			  console.log('Error : ' + error);
			  $ionicLoading.hide();
			  $scope.kwResult = [];
			});

		}

		$scope.onSort = function(){
			if($scope.kwResult.length != 0)
			runSearch();
		}

		$scope.doKeyword = function(){
			runSearch();
		}
		wdata.dataSet($scope);
		wdata.showProfile($scope);
 }) 
 
 .controller('MatchingController',function($scope,wdata,$http, $ionicLoading,$timeout,$state,$ionicHistory,shoppingCart){
			$ionicLoading.show({
				template: 'Loading...'
			});
		var uuid = window.localStorage['wsp_uuid'];
		var $user = JSON.parse(window.localStorage['user']);
		$scope.goPage = function(page){
			$ionicHistory.nextViewOptions({
			  disableBack: true
			});
			$state.go(page);
		}
		$scope.imgstire = base_  + '/images/tyre';
		$scope.front = {};
		$scope.back = {};
	
		console.log('Search page');
		$scope.$parent.showBack = 'hide';
		$http.get( base_ + '/app/dimension').then(function(result){
			var $res = result.data;
			$scope.fwidths 	= $res.width ? $res.width 	: '' ;
			$scope.fratios 	= $res.ratio ? $res.ratio 	: '' ;
			$scope.frims 	= $res.rim 	 ? $res.rim 	: '' ;
			$scope.bwidths 	= $res.width ? $res.width 	: '' ;
			$scope.bratios 	= $res.ratio ? $res.ratio 	: '' ;
			$scope.brims 	= $res.rim 	 ? $res.rim 	: '' ;
			$ionicLoading.hide();
		},function(error){
			console.log('Error');
			$ionicLoading.hide();
		});

		$scope.frontwidthSelected = function(){
			$http.get( base_ + '/app/dimension/change'
				/*
						+ '?rim=' 	+ ($scope.front.rim !== undefined ? $scope.front.rim : '')
						+ '&ratio=' + ($scope.front.ratio !== undefined ? $scope.front.ratio : '')
						+ '&width=' + ($scope.front.width !== undefined ? $scope.front.width : '' )
				*/
						+ '?&width=' 	+ ($scope.front.width 	!== undefined ? $scope.front.width 	: '' )
						+'&ratio=&rim=')
			.then(function(result){
				var $res = result.data;
				$scope.fwidths 	= $res.width;
				$scope.fratios 	= $res.ratio;
				$scope.frims 	= $res.rim;
				$scope.front.rim = '';
				$scope.front.ratio = '';
				$ionicLoading.hide();
			},function(error){
				console.log('Error');
			});

		}
		$scope.frontSelected = function(){
			$http.get( base_ + '/app/dimension/change'
						+ '?rim=' 	+ ($scope.front.rim !== undefined ? $scope.front.rim : '')
						+ '&ratio=' + ($scope.front.ratio !== undefined ? $scope.front.ratio : '')
						+ '&width=' + ($scope.front.width !== undefined ? $scope.front.width : '' ))
				.then(function(result){
				var $res = result.data;
				$scope.fwidths 	= $res.width;
				$scope.fratios 	= $res.ratio;
				$scope.frims 	= $res.rim;
				$ionicLoading.hide();
			},function(error){
				console.log('Error');
			});
		}
		$scope.backwidthSelected = function(){
			$http.get( base_ + '/app/dimension/change'
				/*
												+ '?rim=' 	+ ($scope.back.rim !== undefined ? $scope.back.rim : '')
												+ '&ratio=' + ($scope.back.ratio !== undefined ? $scope.back.ratio : '')
												+ '&width=' + ($scope.back.width !== undefined ? $scope.back.width : '' ))
				*/
						+ '?&width=' 	+ ($scope.back.width 	!== undefined ? $scope.back.width 	: '' )
						+'&ratio=&rim=')
			.then(function(result){
				var $res = result.data;
				$scope.bwidths 	= $res.width;
				$scope.bratios 	= $res.ratio;
				$scope.brims 	= $res.rim;
				$scope.back.rim = '';
				$scope.back.ratio = '';
				$ionicLoading.hide();
			},function(error){
				console.log('Error');
			});

		}
		$scope.backSelected = function(){
			$http.get( base_ + '/app/dimension/change'
												+ '?rim=' 	+ ($scope.back.rim !== undefined ? $scope.back.rim : '')
												+ '&ratio=' + ($scope.back.ratio !== undefined ? $scope.back.ratio : '')
												+ '&width=' + ($scope.back.width !== undefined ? $scope.back.width : '' )).then(function(result){
				var $res = result.data;
				$scope.bwidths 	= $res.width;
				$scope.bratios 	= $res.ratio;
				$scope.brims 	= $res.rim;
				$ionicLoading.hide();
			},function(error){
				console.log('Error');
			});
		}

	
	//:: Run on click result Maching search :://
		$scope.back.sort = 'model';
		function runSearch(){
			$ionicLoading.show({
				template: 'Loading...'
			});
			console.log($scope.front.rim);
			$http({
				method: "POST",
				url: base_ + "/app/product",
				data: {
					frim 	: ($scope.front.rim 	!== undefined  ? $scope.front.rim 	: ''),
					fratio 	: ($scope.front.ratio 	!== undefined ? $scope.front.ratio 	: ''),
					fwidth 	: ($scope.front.width 	!== undefined ? $scope.front.width 	: ''),
					brim 	: ($scope.back.rim		!== undefined ? $scope.back.rim 	: ''),
					bratio 	: ($scope.back.ratio 	!== undefined ? $scope.back.ratio 	: ''),
					bwidth 	: ($scope.back.width 	!== undefined ? $scope.back.width 	: ''),
					stock	: $scope.back.stock,
					qsort	: $scope.back.sort,
					isfrom	: 'machingsearch',
					customer : $user.id,
					uuid 	 : window.localStorage['wsp_uuid']
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
			.then(function(result){
				console.log('result search : ' + result);
				var $sc = result.data;
				//$scope.ftResult = $sc.front ? $sc.front : [];
				//$scope.btResult = $sc.back ? $sc.back:[];
				$scope.tyre = $sc;
				$scope.curDate = $sc.length > 0  ? $sc[0].curDate : '';
				$ionicLoading.hide();
			},function(error){
			  console.log('Error : ' + error);
			  /*
				$scope.ftResult = [];
				$scope.btResult = [];
			*/
				$ionicLoading.hide();
				$scope.tyre = [];
			});
	
		}
		$scope.onSort = function(){
			if($scope.tyre.length != 0)
				runSearch();
		}
		$scope.doMatching = function(selected){
			runSearch();
		};   // Set Ink
		
	wdata.dataSet($scope);
	wdata.showProfile($scope);
 })
 
 /*:: Product Controller use in Product Page 
 ------------------------------------------------------------------------------------------------------*/
 .controller('ProductController',function($scope,wdata,$http,$stateParams,$state,shoppingCart,$ionicHistory,$ionicLoading,$ionicPopup, $ionicModal){
	//window.localStorage['cart'] = '';
	var cOrder 	= window.localStorage['cOrder'];
	var apOrder = window.localStorage['apOrder'];
	//shoppingCart.timeExpired('cartTime');
	$scope.myGoBack = function() {
		$ionicHistory.goBack();
	};

	if(cOrder 	!= '' ){
		var ap 	= JSON.stringify( apOrder );
		var ind = shoppingCart.orderIndex($stateParams.productID);
		$http.get( base_ + '/app/order/' + cOrder +'/edit?do=checkrow&productID=' + $stateParams.productID )
			.then(function(data){
				console.log('data result ' + data.data.result);

				if(data.data.result == 'true'){
					var alertPopup = $ionicPopup.alert({
						 title: 'System Alert',
						 template: 'รายการสินค้านี้มีอยู่ในใบสั่งซื้อแล้ว'
					   });

					    alertPopup.then(function(res) {
					    	console.log('#/app/edit/' + cOrder);
					    	$ionicHistory.goBack();
						});
				}

			});
		if( ind ){
			var alertPopup = $ionicPopup.alert({
				 title: 'System Alert',
				 template: 'รายการสินค้านี้มีอยู่ในใบสั่งซื้อแล้ว'
			   });

			    alertPopup.then(function(res) {
			    	$ionicHistory.goBack();
				});
		}
	}

	 $scope.doRefresh = function() {
	 	console.log('reload');
	 	$state.go($state.current, {}, {reload: true});
	 }

	var $user =  wdata.dataUser() ;
	//alert('user : ' + $user.id );
	
	$ionicLoading.show({
		template: 'Loading...'
	});
	
	$scope.rate = {};

	$http({
			method: "GET",
			url:  base_ + '/app/product/' + $stateParams.productID + '?c=' + $user.id +'&uuid=' + window.localStorage['wsp_uuid'],
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.then(function(result){
			var $res = result.data;
			var ic 			= shoppingCart.onCart( $res.product_id );
			var selected 	= ic ? ic.qty : 1; 
			var remark 		= ic ? ic.remark : '';
			var $opts 	= [];
			
			$scope.pr = $res;
			$scope.imgstire = base_  + '/images/tyre';
			$scope.imgsmanu = base_  + '/images/smManuPic';
			$scope.rate.product_id = $res.product_id;
			$scope.rate.stock = $res.qty;
			$scope.rate.salePrice = $res.salePrice;
			$scope.rate.detail = $res.detail;

			if($res.qty == 0){
					$opts.push({'value' : 0,'label' : 0});
					
			}else{
			for($i = 1; $i <= $res.qty; $i++){
				$x = { 'value' : $i , 'label' : $i };
				$opts.push($x);
			}
			}
			if($res.qty == 0){
				$scope.rate.selected 	= 0;
				$scope.rate.unit 		= 0;		
			}else{
				$scope.rate.selected 	= selected;
				$scope.rate.unit 		= selected;		
			}
			$scope.rate.price 	= $res.price;
			$scope.rate.remark 	= remark;
			$scope.options = $opts;
			$ionicLoading.hide();
		},function(error){
			console.log('Error product');
			//alert('Error product ' + JSON.stringify( error ) );
		});
	console.log('on cart : ' + shoppingCart.cart);

$ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.doZoom = function() {
  	$scope.imageSrc = base_ + '/images/tyre/' + $scope.pr.model_img;
  	$scope.imageLogo = base_ + '/images/smManuPic/' + $scope.pr.manufacturer_img;
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });



	$scope.doCancel = function(){
		console.log('goto back page');
		$state.go('app.search');
	}
	
	$scope.doAddcart = function(){
		var $sum = $scope.rate.price * $scope.rate.unit;
		$scope.order = {  
			'product_id' 	: $scope.rate.product_id,
			'detail' 	: $scope.rate.detail,
			'qty'			: $scope.rate.unit,
			'price'			: $scope.rate.price,
			'total_price'	: $sum,
			'remark'		: $scope.rate.remark,
			'stock'			: $scope.rate.stock,

			
		};

		console.log('add cart data : ' + $scope.order );
		var cOrder = window.localStorage['cOrder'];
		if(cOrder == '' || cOrder === undefined || cOrder === null){
			shoppingCart.addCart($scope.order);
			$state.go('app.summary');
		}else{
			$scope.order.order_id =  cOrder ;
			shoppingCart.orderAppend($scope.order);
			window.location.href="#/app/edit/" + cOrder;
		}	
	}
    
	$scope.sumQty 	= shoppingCart.onSum('qty');
	$scope.sumPrice = shoppingCart.onSum('price');
    // Set Ink
	wdata.showProfile($scope);
	wdata.dataSet($scope);
	
 })
  