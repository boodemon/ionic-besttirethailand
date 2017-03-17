var base_ = 'http://www.thaibesttire.com/wsp/public';
var img_ = 'http://www.thaibesttire.com/wsp/public/images';

angular.module('thaibesttire.orderControllers', [])
 /*:: Summary Controller use in Setting Page 
 ------------------------------------------------------------------------------------------------------*/
 .controller('SummaryController',function($scope,wdata,$http,$ionicLoading,$ionicPopup,shoppingCart,$state,$ionicHistory){
	 //console.log('summary controller');
	$scope.user = wdata.dataUser();
	shoppingCart.timeExpired('cartTime');

	var jsonCart = window.localStorage['cart'];

	$scope.doCart = function(){
		$state.go('app.search');
	};
	console.log(jsonCart);
	 /*
	if(jsonCart == '' || jsonCart === undefined ){
		var alertPopup = $ionicPopup.alert({
			title: 'System Error!!',
			template: 'ยงไม่มีการเลือกซื้อสินค้าใด ๆ กรุณาทำการเลือกซื้อสินค้า ก่อนค่ะ'
		});
		
		alertPopup.then(function(res) {
			//$state.go('app.home');
			window.location.href="#/app/search";
	   });
	};
	*/

	$scope.order 	= {};
	var loadPage = function(){
			$ionicLoading.show({
				template: 'Loading...'
			});

		var onCart = window.localStorage['cart'];
		
		$scope.cart 	= ( onCart != '' && onCart !== undefined ) ? JSON.parse( onCart ) : false;
		/*
		if($scope.cart 	=== false){
			$state.go('app.search');
		}
		*/

		for($c = 0; $c < $scope.cart.length; $c++){
			$u = [];
			for($o = 1; $o <= $scope.cart[$c].stock; $o++){
				$u.push( {
					'label' : $o,
					'value' : $o
				});
			}
			$scope.stock = $u;
			//$scope.rate.unit = $scope.cart[$c].qty
		}
		$ionicLoading.hide();
	}
	
	loadPage();

	$scope.doRefresh = function() {
	 	console.log('reload');
	 	loadPage();
	 	$scope.$broadcast('scroll.refreshComplete');
	 	//window.location.reload();
	};
	/* :: Autocomplete Code Start 
	=================================================================*/
		$scope.asyncSearch = function (str) {
                $http.get( base_ + '/app/profile?sale=' + $scope.user.id +'&term=' + str ).then(function (response) {
                    $scope.autocompleteInputAsync.searchlist = response.data;
                    $scope.$root.$broadcast($scope.autocompleteInputAsync.ID);
                }, function () {
                    $scope.autocompleteInputAsync.searchlist = undefined;
                    $scope.$root.$broadcast($scope.autocompleteInputAsync.ID);
                });
            };

            $scope.setModel = function (item) {
                $scope.selectedItem = item;

            };

            $scope.setModelAsync = function (item) {
                $scope.selectedItemAsync = item;
                $scope.cust = item;
				console.log('select is : ' + JSON.stringify( item.name ));
				$scope.order.customer 		= item.id;
				$scope.order.customer_id 		= item.id;
				$scope.order.customer_tel 		= item.tel;
				$scope.order.customer_address 	= item.address;

            };

            $scope.autocompleteInputAsync = {
                'propNameToDisplay': 'name',
                'isAsyncSearch': true,
                 'ID':'AsyncData',
                'placeholder': 'Search Customer',
                'listClass': [],
                'labelContainerClass': ['item item-input']
            };

            $scope.autocompleteInputAsync.itemSelectCallback = $scope.setModelAsync;
            $scope.autocompleteInputAsync.asyncHttpCall = $scope.asyncSearch;		

	

	/* :: Autocomplete Code End 
	=================================================================*/
	function calCart(){
		var sumQty = 0;
		var sumPrice = 0;
		for($nt = 0; $nt < $scope.cart.length; $nt++){
				$itQty = $scope.cart[$nt].qty;
				//console.log('in qty : ' + $itQty );
				$scope.cart[$nt].qty = $itQty;
				sumQty 		+= $itQty;
				sumPrice 	+= ($scope.cart[$nt].price * $itQty);
		}
		$scope.sumQty 	= sumQty;
		$scope.sumPrice = sumPrice;
		
	}
	calCart();
	$scope.changeQty = function(){
		calCart();
	}
	$http.get( base_ + '/app/priority' ).then(function(result){
		var $prio = result.data;
		$scope.priority = $prio;
		$scope.order.priority = $prio[1].id;
	},function(error){
		console.log('Error');
	});
			
	$http.get( base_ + '/app/transport' ).then(function(result){
		var $tp = result.data;
		$scope.trans = $tp;
		$scope.order.transport = $tp[0].id;
	},function(error){
		console.log('Error');
	});
		
	 $scope.doUp = function(node){
		var q = parseInt($scope.cart[node].qty) ;
		var $stock = parseInt($scope.cart[node].stock);
		//console.log('has stock ' + $stock );
		if(q < $stock)
		q += 1;
		$scope.cart[node].qty = q;
		calCart();
	 };
	
	 $scope.doDown = function(node){
		var q = $scope.cart[node].qty;
		q -= 1;
		if(q >= 1)
		$scope.cart[node].qty = q;
		calCart();
	
	 };
	 
	 $scope.doRemove = function(node){
		 var confirmPopup = $ionicPopup.confirm({
			title : 'ยืนยันการลบ', 
			template: 'ยืนยันการลบรายการสั่งซื้อ'
		});

		confirmPopup.then(function(res) {
			if(res) {
				//console.log('You are sure ' + node);
				shoppingCart.removeCart(node);
				//$scope.cart.splice(node, );
				var reCart = window.localStorage['cart'];
				loadPage();
				//$scope.cart = JSON.parse(reCart);
				calCart();
				//window.location.reload();
				//$scope.cart[node] = '';
			} else {
				//console.log('You are not sure');
			}
	   });
	 };

	$scope.clearCustomer = function(){
		document.getElementById('AsyncData').value = '';
		$scope.customer.address = '';
		$scope.order.customer.tel = '';
		console.log('clear customer search');
	}
	
	 $scope.doCancle = function(){
			shoppingCart.cancleCart('app.search');
	 }

	 $scope.doUpdate = function(){
	 	console.log($scope.cart);
	 	shoppingCart.updateCart($scope.cart);

	 	var alertPopup = $ionicPopup.alert({
						 	title: 'System Alert',
						 	template: "ทำการอัพเดทข้อมุล เรียบร้อยแล้วค่ะ "
					   	});

					   	alertPopup.then(function(res) {
						 	console.log('Thank you Setting update');
						 	$state.go($state.current, {}, {reload: true});
					});
	 }

	 $scope.doOrder = function(node){
	 	console.log($scope.cust);
	 	if($scope.user.map_type == 'sale'){
	 		var customerID 	= $scope.cust !== undefined ? $scope.order.customer_id : '',
	 			cAddress 	= $scope.cust !== undefined ? $scope.order.customer_address : '',
	 			cLat 		= $scope.cust !== undefined ? $scope.cust.lat : '',
	 			cLon 		= $scope.cust !== undefined ? $scope.cust.lon : '',
	 			cTel 		= $scope.cust !== undefined ? $scope.order.customer_tel : '';
	 			cBy 		=	3;
	 	}else{
	 		var customerID 	= $scope.user.id,
	 			cAddress 	= $scope.user.address,
	 			cTel 		= $scope.user.tel,
	 			cLat 		= $scope.user.lat,
	 			cLon 		= $scope.user.lon;
	 			cBy 		= 2;
	 	}


	 	if( customerID == '' || customerID === undefined){
			   var alertPopup = $ionicPopup.alert({
					 title: 'System Alert',
					 template: 'กรุณาทำการระบุลูกค้าก่อนทำการสั่งซื้อ'
				   });

				   alertPopup.then(function(res) {
					 return false;
				   });

	 		}else{
				 var confirmPopup = $ionicPopup.confirm({
					title : 'ยืนยันการสั่งซื้อ', 
					template: 'กรุณายืนยันการสั่งซื้อ'
				});

				confirmPopup.then(function(res) {
					if(res) {
						$user = JSON.parse( window.localStorage['user'] );
						$http({
							method: "POST",
							url: base_ + "/app/order",
							data: {
								customer_id 	: customerID,
								address 		: cAddress,
								lat			: cLat,
								lon 			: cLon,
								tax 			: $scope.order.tax,
								priority_id 		: $scope.order.priority,
								remark			: $scope.order.remark != undefined ? $scope.order.remark : '',
								qty			: $scope.sumQty,
								total_price		: $scope.sumPrice,
								created_by 		: $user.id,
								create_type		: cBy,
								detail 			: $scope.cart,
								uuid 			: window.localStorage['wsp_uuid'],
								process			: 'new'
							},
							headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
						})
						.then(function(result){
							console.log('result search : ' + result);
							   var alertPopup = $ionicPopup.alert({
								 title: 'ทำการสั่งซื้อเรียบร้อยแล้ว',
								 template: 'สิ้นสุดการทำรายการ \nระบบได้ทำการส่งใบสั่งซื้อให้กับเจ้าหน้าที่เรียบร้อยแล้วค่ะ \nขอขอบคุณค่ะ'
							   });

							   alertPopup.then(function(res) {
								 console.log('Thank you for not eating my delicious ice cream cone');
								 window.localStorage['cart'] = '';
								 $state.go('app.order');
							   });
						},function(error){
						  console.log('Error : ' + error);
						});
					}
			   });
		}
	 };
	wdata.dataSet($scope);

 })

/* :: Edit Controller for Edit order pendding
--------------------------------------------------------------------------------------------------------------------------------------------------*/
 .controller('EditController',function($scope,wdata,$http,$ionicLoading,$stateParams,$ionicPopup,shoppingCart,$state,$ionicHistory){
	 //console.log('summary controller');
	window.localStorage['cOrder'] = $stateParams.orderID;

	//window.localStorage['apOrder'] = '';
	var apData = window.localStorage['apOrder'];
	var $user = wdata.dataUser();

	$scope.doCart = function(){ 
		window.localStorage['cOrder'] = '';
		$state.go('app.order');
		//$ionicHistory.goBack();
	}

	if(apData != '' && apData !== undefined && apData !== null){
		var ap = JSON.parse( apData );
		$scope.apOrder = ap.cOrder;
	}


	$scope.order = {};
	$scope.detail = {};

	$http.get( base_ + '/app/priority' ).then(function(result){
		var $prio = result.data;
		$scope.priority = $prio;
		$scope.order.priority = $prio[0].id;
	},function(error){
		console.log('Error');
	});
	/* :: Autocomplete Code Start 
	=================================================================*/
		$scope.user = wdata.dataUser();
		$scope.asyncSearch = function (str) {
                $http.get( base_ + '/app/profile?sale=' + $scope.user.id +'&term=' + str ).then(function (response) {
                    $scope.autocompleteInputAsync.searchlist = response.data;
                    $scope.$root.$broadcast($scope.autocompleteInputAsync.ID);
                }, function () {
                    $scope.autocompleteInputAsync.searchlist = undefined;
                    $scope.$root.$broadcast($scope.autocompleteInputAsync.ID);
                });
            };

            $scope.setModel = function (item) {
                $scope.selectedItem = item;

            };

            $scope.setModelAsync = function (item) {
                $scope.selectedItemAsync = item;
                $scope.cust = item;
				console.log('select is : ' + JSON.stringify( item.name ));
				$scope.order.customer_id 		= item.id;
				$scope.order.customer.id 		= item.id;
				$scope.order.customer.tel 		= item.tel;
				$scope.order.customer.address 	= item.address;

            };

            $scope.autocompleteInputAsync = {
                'propNameToDisplay': 'name',
                'isAsyncSearch': true,
                 'ID':'AsyncData',
                'placeholder': 'Search Customer',
                'listClass': [],
                'labelContainerClass': ['item item-input']
            };

            $scope.autocompleteInputAsync.itemSelectCallback = $scope.setModelAsync;
            $scope.autocompleteInputAsync.asyncHttpCall = $scope.asyncSearch;		

	

	/* :: Autocomplete Code End 
	=================================================================*/
			
	var detail = [];
	function startup(){
			$ionicLoading.show({
				template: 'Loading...'
			});

		$http.get( base_ + '/app/order/' + $stateParams.orderID  )
			.then(function(result){
		 	 	var $ords = result.data;
		 	 	$scope.head 			= $ords.order;
		 	 	$scope.customer 	= $ords.customer;
		 	 	$scope.detail 			= $ords.detail;
		 	 	console.log('customer : ' + JSON.stringify( $ords.customer ));
		 	 	//$scope.order.customer_id = $ords.customer.id;
		 	 	if($user.map_type == 'sale')
		 	 	document.getElementById('AsyncData').value = $ords.customer.name;

		 	 	if($ords.order.need_tax == 1){
		 	 		console.log('tax true');
		 	 		$scope.order = {'tax' : true };
		 	 	}
		 	 	$scope.order.priority =  $ords.order.priority_id;
		 	 	$scope.order.remark = $ords.order.remark;

			 	$u = [];
				for($c = 0; $c < $scope.detail.length; $c++){
					for($o = 1; $o <= $scope.detail[$c].stock; $o++){
						$u.push( {
							'label' : $o,
							'value' : $o
						});
					}
				}
				$scope.stock = $u ? $u : [];


		 	 	$scope.sumQty 	= $scope.head.qty + shoppingCart.orderSum('qty');
				$scope.sumPrice = $scope.head.total_price + shoppingCart.orderSum('price');


				$http.get( base_ + '/app/transport' ).then(function(result){
					var $tp = result.data;
					$scope.trans = $tp;
					$scope.order.transport = $ords.order.transport_id;
				},function(error){
					console.log('Error');
				});
				$ionicLoading.hide();

		 	},function(error){
				console.log('Error');
				$ionicLoading.hide();
			});
		}
		startup();
		if($scope.apOrder){
			for($c = 0; $c < $scope.apOrder.length; $c++){
				$u = [];
				for($o = 1; $o <= $scope.apOrder[$c].stock; $o++){
					$u.push( {
						'label' : $o,
						'value' : $o
					});
				}
				$scope.opstock = $u;
				//$scope.rate.unit = $scope.cart[$c].qty
			}
		}
	$scope.clearCustomer = function(){
		document.getElementById('AsyncData').value = '';
		$scope.customer.address = '';
		$scope.order.customer.tel = '';
		console.log('clear customer search');
	}

		function calCart(){
			var sumQty 		= 0;
			var sumPrice 	= 0;
			console.log('len ' + apData);
			if($scope.detail.length > 0){
				for($nt = 0; $nt < $scope.detail.length; $nt++){
					$itQty = $scope.detail[$nt].qty;
					$scope.detail[$nt].qty = $itQty;
					sumQty 		+= $itQty;
					sumPrice 	+= ($scope.detail[$nt].price * $itQty);
					console.log('in qty : ' + $itQty + ' | ' + sumQty + ' | ' + sumPrice );

				}
			}

			if(apData != '' && apData !== undefined){
				if($scope.apOrder.length > 0){
					for($nx = 0; $nx < $scope.apOrder.length; $nx++){
						$itQty = $scope.apOrder[$nx].qty;

						$scope.apOrder[$nx].qty = $itQty;
						sumQty 		+= $itQty;
						sumPrice 	+= ($scope.apOrder[$nx].price * $itQty);				
						console.log('ap in qty : ' + $itQty + ' | ' + sumQty + ' | ' + sumPrice );
					}
				}
			}
			$scope.sumQty 	= sumQty;
			$scope.sumPrice = sumPrice;
			
		}
		calCart();

			$scope.oldUp = function(node){
			var q = parseInt($scope.detail[node].qty) ;
			//var $stock = parseInt($scope.detail[node].stock);
			//console.log('has stock ' + $stock );
			//if(q < $stock)
			q += 1;
			$scope.detail[node].qty = q;
			calCart();
		};
		
		$scope.oldDown = function(node){
			var q = $scope.detail[node].qty;
			q -= 1;
			if(q >= 1)
			$scope.detail[node].qty = q;
			calCart();
		};
		
		$scope.doUp = function(node){
			var q = parseInt($scope.apOrder[node].qty) ;
			var $stock = parseInt($scope.apOrder[node].stock);
			//console.log('has stock ' + $stock );
			if(q < $stock)
			q += 1;
			$scope.apOrder[node].qty = q;
			calCart();
		};
		
		$scope.doDown = function(node){
			var q = $scope.apOrder[node].qty;
			q -= 1;
			if(q >= 1)
			$scope.apOrder[node].qty = q;
			calCart();
		};
		 
		$scope.oldRemove = function(id , node){
			console.log('id : ' + id + ' | node ' + node);
			var confirmPopup = $ionicPopup.confirm({
					title : 'ยืนยันการลบ', 
					template: 'ยืนยันการลบรายการสั่งซื้อ'
				});

		confirmPopup.then(function(res) {
			if(res) {
				//console.log('You are sure ' + node);
				//shoppingCart.removeCart(node);
/*
				$http({
					method: "GET",
					url: base_ + "/app/order/" + id + '/edit?do=delete&c=' + $user.id + '&orderID=' + $stateParams.orderID,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				})
				.then(function(result){
					$scope.detail.splice(node, 1);
					startup();
					calCart();

				},function(error){
				  console.log('Error : ' + error);
				});
*/
					$scope.detail.splice(node, 1);
					//startup();
					calCart();

				//$scope.cart[node] = '';
			}
		});
	};
	 
	 $scope.changeQty = function(){
	 	calCart();
	 }
	 $scope.doRemove = function(node){
		 var confirmPopup = $ionicPopup.confirm({
			title : 'ยืนยันการลบ', 
			template: 'ยืนยันการลบรายการสั่งซื้อ'
		});

		confirmPopup.then(function(res) {
			if(res) {
				//console.log('You are sure ' + node);
				shoppingCart.orderRemove(node);
				$scope.apOrder.splice(node, 1);
				calCart();
				//$scope.cart[node] = '';
			} else {
				//console.log('You are not sure');
			}
	   });
	 };

	 $scope.doCancle = function(){
		 var confirmPopup = $ionicPopup.confirm({
			title : 'ยืนยันการยกเลิก', 
			template: 'ยกเลิกรายการสั่งซื้อสินค้าในรายการทั้งหมด'
		});

		confirmPopup.then(function(res) {
			if(res) {
				$http({
					method: "GET",
					url: base_ + "/app/order/" + $stateParams.orderID + '/edit?c=' + $user.id +'&do=cancle',
				})
				.then(function(result){
					var $ord = result.data;
					$scope.ord = $ord;
				},function(error){
				  console.log('Error : ' + error);
				});
				window.localStorage['cOrder'] = '';
				window.localStorage['apOrder'] = '';

				$state.go('app.order');
			}
		});
	 }

	 $scope.doOrder = function(node){
	 	console.log($scope.customer);
	 	if($scope.user.map_type == 'sale'){
	 		var customerID 	= $scope.customer !== undefined ? $scope.customer.id : '',
	 			cAddress 	= $scope.customer !== undefined ? $scope.customer.address : '',
	 			cLat 		= $scope.customer !== undefined ? $scope.customer.lat : '',
	 			cLon 		= $scope.customer !== undefined ? $scope.customer.lon : '',
	 			cTel 		= $scope.customer !== undefined ? $scope.customer.tel : '';
	 			cBy 		=	3;
	 	}else{
	 		var customerID 	= $user.id,
	 			cAddress 	= $user.address,
	 			cTel 		= $user.tel,
	 			cLat 		= $user.lat,
	 			cLon 		= $user.lon;
	 			cBy 		=	2;
	 	}
	 	var qtyOrder = $scope.sumQty;
	 	//alert('qty order ' + qtyOrder);

	 	if(qtyOrder > 0){

		 	if( customerID == '' || customerID === undefined){
				   var alertPopup = $ionicPopup.alert({
						 title: 'System Alert',
						 template: 'กรุณาทำการระบุลูกค้าก่อนทำการสั่งซื้อ'
					   });

					   alertPopup.then(function(res) {
						 return false;
					   });

		 		}else{
					 var confirmPopup = $ionicPopup.confirm({
						title : 'ยืนยันการสั่งซื้อ', 
						template: 'กรุณายืนยันการสั่งซื้อ'
					});

					confirmPopup.then(function(res) {
						if(res) {
							$user = JSON.parse( window.localStorage['user'] );
							$http({
								method: "POST",
								url: base_ + "/app/order",
								data: {
									customer_id 	: customerID,
									address 		: cAddress,
									lat				: cLat,
									lon 			: cLon,
									orderID			: $stateParams.orderID,
									tax 			: $scope.order.tax,
									priority_id		: $scope.order.priority,
									transport_id 	: $scope.order.transport,
									remark			: $scope.order.remark != undefined ? $scope.order.remark : '',
									qty				: $scope.sumQty,
									total_price		: $scope.sumPrice,
									create_type		: cBy,
									created_by 		: $user.id,
									append 			: $scope.apOrder,
									old 			: $scope.detail,
									uuid 			: window.localStorage['wsp_uuid'],
									process			: 'update'
								},
								headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
							})
							.then(function(result){
								console.log('result search : ' + result);
								   var alertPopup = $ionicPopup.alert({
									 title: 'ทำการสั่งซื้อเรียบร้อยแล้ว',
									 template: 'สิ้นสุดการทำรายการ \nระบบได้ทำการส่งใบสั่งซื้อให้กับเจ้าหน้าที่เรียบร้อยแล้วค่ะ \nขอขอบคุณค่ะ'
								   });

								   alertPopup.then(function(res) {
									 	console.log('Thank you for not eating my delicious ice cream cone');
										window.localStorage['cOrder'] = '';
										window.localStorage['apOrder'] = '';
										$state.go('app.order');
								   });
							},function(error){
							  console.log('Error : ' + JSON.stringify( error ));
							});

						}
				   });
				}
			}else{
				 var alertPopup = $ionicPopup.alert({
						 title: 'System Alert',
						 template: 'กรุณาทำการเพิ่มรายการสินค้า ก่อนทำการสั่งซื้อค่ะ'
					   });

					   alertPopup.then(function(res) {
						 return false;
					   });
			}
		
	 };
	wdata.dataSet($scope);
	 
 })/* :: Edit Controller for Edit order pendding
--------------------------------------------------------------------------------------------------------------------------------------------------*/
 .controller('ViewController',function($scope,wdata,$http,$ionicLoading,$stateParams,$ionicPopup,shoppingCart,$state,$ionicHistory){
	//window.localStorage['apOrder'] = '';
	var $user = wdata.dataUser();
	$ionicLoading.show({
		template: 'Loading...'
	});

	$scope.doCart = function(){
		window.localStorage['cOrder'] = '';
		$state.go('app.order');
		//$ionicHistory.goBack();
	}

	$http.get( base_ + '/app/priority' ).then(function(result){
		var $prio = result.data;
		$scope.priority = $prio;
	},function(error){
		console.log('Error');
	});
	

	$scope.order = {};
	$scope.detail = {};

		$http.get( base_ + '/app/order/' + $stateParams.orderID  )
			.then(function(result){
		 	 	var $ords 		= result.data;
		 	 	$scope.head 	= $ords.order;
		 	 	$scope.detail 	= $ords.detail;

		 	 	if($ords.order.need_tax == 1){
		 	 		console.log('tax true');
		 	 		$scope.order = {'tax' : true };
		 	 	}
		 	 	$scope.order.remark 	= $ords.order.remark;
				$scope.order.priority 	= $ords.order.priority_name;
		 	 

		 	 	$scope.sumQty 	= $scope.head.qty + shoppingCart.orderSum('qty');
				$scope.sumPrice = $scope.head.total_price + shoppingCart.orderSum('price');


				$http.get( base_ + '/app/transport' ).then(function(result){
					var $tp = result.data;
					$scope.trans = $tp;
					$scope.order.transport = $ords.order.transport_id;
				},function(error){
					console.log('Error');
				});
				$ionicLoading.hide();

		 	});
	 	wdata.dataSet($scope);

 })
 /*:: Setting Controller use in Setting Page 
 ------------------------------------------------------------------------------------------------------*/
 .controller('OrderController',function($scope,wdata,$http,$ionicLoading,shoppingCart, ionicDatePicker,$filter,$ionicPopup,$ionicHistory){
 	wdata.dataUser();
	console.log('order congroller');
	window.localStorage['cOrder'] = '';
	window.localStorage['apOrder'] = '';

	var $cart = window.localStorage['cart'];
		$scope.search = {};
		$scope.cart = $cart;
		$scope.sumQty 	= shoppingCart.onSum('qty');
		$scope.sumPrice = shoppingCart.onSum('price');
		$user = JSON.parse( window.localStorage['user'] );
		var date =  new Date();
		$scope.search.start = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() ;
		$scope.search.end = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() ;

		$scope.ordstatus = [
			{'value' : '','text' : '-ทั้งหมด-'},
			{'value' : 0,'text' : 'รอชำระเงิน'},
			{'value' : 1,'text' : 'จัดสินค้า'},
			{'value' : 2,'text' : 'ส่งสินค้า'},
			{'value' : 3,'text' : 'ส่งสำเร็จ'},
			{'value' : 4,'text' : 'ยกเลิก'}
		];
		$scope.viewStatus = [ 'รอชำระเงิน','จัดสินค้า' , 'ส่งสินค้า' , 'ส่งสำเร็จ' , 'ยกเลิก' ];

		$scope.search.ordstatus = '';
		console.log('user ' + JSON.stringify( $user ));

	$http.get( base_ + '/app/order?c=' + $user.id +'&mapType=' + $user.map_type ).then(function(result){
		var $ord = result.data.rows;
		$scope.ord = $ord;

		$scope.page = result.data.paginate;
	},function(error){
		console.log('Error');
	});
	
	var $start = {
		callback: function (val) {  //Mandatory
			$date = $filter('date')(val, "dd-MM-yyyy");
			$scope.search.start = $date;
		},
		mondayFirst: false,          //Optional
		closeOnSelect: true,       //Optional
		templateType: 'popup'       //Optional
    };	
	var $end = {
		callback: function (val) {  //Mandatory
			$date = $filter('date')(val, "dd-MM-yyyy");
			$scope.search.end = $date;
		},
		mondayFirst: false,          //Optional
		closeOnSelect: true,       //Optional
		templateType: 'popup'       //Optional
    };
	
	$scope.openDateStart = function(){
      ionicDatePicker.openDatePicker($start);
    };
	
	$scope.openDateEnd = function(){
      ionicDatePicker.openDatePicker($end);
    };
	
	$scope.doSearch = function(){
		var $name = ($user.map_type == 'sale') ? $scope.search.customer : $user.name; 
		console.log('search name ' + $name +'&mapType=' + $user.map_type);
		$http.get( base_ + '/app/order?c=' + $user.id 
						+'&mapType=' 	+ 	$user.map_type
						+'&start=' 		+ 	($scope.search.start != undefined 		? $scope.search.start : '')
						+ '&end=' 		+ 	($scope.search.end  != undefined 		? $scope.search.end  : '')
						+ '&status=' 	+ 	($scope.search.ordstatus  != undefined 	? $scope.search.ordstatus  : '')
						+ '&name=' 		+ 	$name ).then(function(result){
			var $ord 	= result.data.rows;
			var $page  = result.data.paginate;
			$scope.ord = $ord;
			$scope.page = $page;

			$scope.paginate = paginate( $page.last_page );
		},function(error){
			console.log('Error');
		});
	}
	/* PAGINATE START */
		function paginate(num){
			var $p = [];
			for(var $np = 1; $np <= num; $np++){
				$p.push($np);
			}
			return $p;
		}

		$scope.changePage = function(numPage){
			var $name = ($user.map_type == 'sale') ? $scope.search.customer : $user.name; 
			console.log('change page is ' + numPage +' name ' + $name +'&mapType=' + $user.map_type);
			$http.get( base_ + '/app/order?c=' + $user.id 
							+'&mapType=' 	+ 	$user.map_type
							+'&start=' 		+ 	($scope.search.start != undefined 		? $scope.search.start : '')
							+ '&end=' 		+ 	($scope.search.end  != undefined 		? $scope.search.end  : '')
							+ '&status=' 	+ 	($scope.search.ordstatus  != undefined 	? $scope.search.ordstatus  : '')
							+ '&page=' 		+	numPage 	
							+ '&name=' 		+ 	$name ).then(function(result){
				var $ord 	= result.data.rows;
				var $page  = result.data.paginate;
				$scope.ord = $ord;
				$scope.page = $page;

				$scope.paginate = paginate( $page.last_page );
			},function(error){
				console.log('Error');
			});

		}
	/* PAGINATE END */

	
	$scope.orderCancle = function(key){
		 var confirmPopup = $ionicPopup.confirm({
			title : 'ยืนยันการยกเลิก', 
			template: 'ยกเลิกรายการสั่งซื้อสินค้าในรายการทั้งหมด'
		});

		confirmPopup.then(function(res) {
			if(res) {
				$http({
					method: "GET",
					url: base_ + "/app/order/" + key + '/edit?c=' + $user.id +'&do=cancle',
				})
				.then(function(result){
					var $ord = result.data;
					$scope.ord = $ord;
				},function(error){
				  console.log('Error : ' + error);
				});
			}
		});
		
	}

	$scope.cancleCart = function(){
		shoppingCart.cancleCart('reload');
	}
		
	wdata.dataSet($scope);
	wdata.showProfile($scope);
 })

