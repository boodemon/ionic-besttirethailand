var base_ = 'http://www.thaibesttire.com/wsp/public';
angular.module('thaibesttire.service', [])
.service('wdata',function($http,$state,$cordovaDevice,shoppingCart,$timeout,$ionicModal){
	this.dataSet = function($scope){
		$http.get( base_ + '/app/data').then(function(result){
			var $res = result.data;
			$scope.wset = $res;
			$scope.wlogo = base_ + '/images/' + $res.logo;
		},function(error){
			console.log('Error and redirect register');
			$state.go('register')
		});			

		// Start Check product in current cart
		function inCart(){
			var onCart = window.localStorage['cart'];
			$scope.iniCart 	= ( onCart != '' && onCart !== undefined ) ? JSON.parse( onCart ) : false;
			var sumQty = 0;
			var sumPrice = 0;
			for($nt = 0; $nt < $scope.iniCart.length; $nt++){
					$itQty = $scope.iniCart[$nt].qty;
					//console.log('in qty : ' + $itQty );
					$scope.iniCart[$nt].qty = $itQty;
					sumQty 		+= $itQty;
					sumPrice 	+= ($scope.iniCart[$nt].price * $itQty);
			}
			$scope.sumQty 	= sumQty;
			$scope.sumPrice = sumPrice;
			$scope.intQty 	= sumQty;
			console.log( 'sumQty ' + $scope.intQty );
			return $scope;
		}
		$scope.inCart = function(){
			$state.go('app.summary');
		}
	  	$scope.$on("$ionicView.enter", function(event, data){
			inCart();
		   // handle event
		   /*
		   console.log("State Params: ", data.stateParams);
	 		$ionicModal.fromTemplateUrl('template/oncart.html', {
		    	scope: inCart()
		  	}).then(function(modal) {
		    	$scope.modal = modal;
		  	});
		  	*/

		});



  		 // end check product in current cart //


		
		var lang = window.localStorage['lang'];
		if( lang == 'th' || lang == '' || lang == undefined || lang === null ){
			$scope.labels = {
				width 	: 'หน้ากว้าง',
				ratio 	: 'ซีรีย์',
				rim 	: 'ขอบ',
				all		: 'ทั้งหมด',
				keyword : 'คำค้นหา',
				detail	: 'รายละเอียด',
				product : 'สินค้า',
				only_available : 'เฉพาะที่มีสินค้า',
				product_detail : 'รายละเอียดสินค้า',
				price 	: 'ราคา',
				week_year 	: 'ผลิต',
				baht 	: 'บาท',
				notfound_product 	: 'ไม่พบรายการสินค้า',
				unit 	: 'จำนวน',
				week 	:  'สัปดาห์',
				customer : 'ลูกค้า',
				tel 	: 'เบอร์ติดต่อ',
				rule_sale : 'กำหนดการแสดงราคา',
				set_price : 'ตั้งราคาขาย',
				or_min_price : 'หรือขั้นต่ำที่',
				show_sale_price : 'แสดงราคาขาย',
				show_costs_price : 'แสดงราคาส่ง',
				set_lang 		 : 'กำหนดภาษา',
				save_change		 : 'บันทึกการเปลี่ยนแปลง',
				system_select 	 : 'ระบบจะเลือกอย่างใดอย่างหนึ่งที่สูงกว่า',
				address 		 : 'ที่อยู่',
				back 			: 'หลัง',
				front 			: 'หน้า',
				tax				: 'ออกใบกำกับภาษี',
				sum 			: 'รวม',
				total 			: 'รวมทั้งสิ้น',
				no_order 		: 'ยังไม่มีรายการสั่งซื้อ',
				total_unit 		: 'จำนวนรวมทั้งสิ้น',
				total_price 	: 'ราคารวมทั้งสิ้น',
				pcs				: 'รายการ',
				cancel_order 	: 'ยกเลิกสั่งซื้อ',
				confirm_order   : 'สั่งซื้อ',
				update_order   : 'ปรับปรุงรายการ',
				remark			: 'หมายเหตุ',
				cancle 			: 'ยกเลิก',
				add_product 	: 'เพิ่มสินค้า',
				status 			: 'สถานะ',
				edit 			: 'แก้ไขรายการ',
				preview 		: 'ดูรายการ',
				date_order		: 'วันที่สั่งซื้อ',
				search_cust		: 'ค้นหาจากซื้อลูกค้า',
				transport 		: 'จัดส่งโดย',
				manufact 		: 'ผู้ผลิต',
				model 			: 'รุ่น',
				value 			: 'มูลค่า',
				code 			: 'รหัส',
				comment 		: 'คอมเมนท์',
				product_detail	: 'ข้อมูลสินค้า',
				ok				: 'ตกลง',
				device 			: 'อุปกรณ์',
				sale 			: 'ผู้สั่งซื้อ',
				taxcode			: "เลขประจำตัวผู้เสียภาษี", 
				other			: "ข้อมูลอื่น ๆ", 
				email 			: "อีเมล์",
				fax  			: "แฟกซ์", 

			}

			$scope.txtmenus =  {
				index 		: 'หน้าหลัก',
				home 		: 'ข่าวสาร',
				search 		: 'ค้นหา',
				order 		: 'รายการสั่งซื้อ',
				status 		: 'สถานะการสั่งซื้อ',
				call_center : 'ติดต่อเรา',
				aboutus 	: 'รู้จักเรา',
				setting 	: 'ตั้งค่า',
				exit 		: 'ออกจากระบบ',
				product_detail : 'รายละเอียดสินค้า',
				edit_order : 'แก้ไขการสั่งซื้อ',

			}
		}else{
			$scope.labels = {
				width 	: 'WIDTH',
				ratio 	: 'RATIO',
				rim 	: 'RIM',
				all 	: 'All',
				keyword : 'Keywords',
				detail	: 'Detail',
				product : 'Product',
				only_available : 'Only Available',
				product_detail : 'Product Detail',
				price 	: 'Price',
				week_year 	: 'WEEK-YEAR',
				baht 		: 'Baht',
				notfound_product 	: 'Not Found Product',
				unit 		: 'Unit',
				week 		: 'Week',
				customer 	: 'Customer',
				tel 		: 'Tel.',
				rule_sale 	: 'The conditions of sale',
				set_price 	: 'Set Sale',
				or_min_price : 'Or Minimum',
				show_sale_price : 'Show Sale Price',
				show_costs_price : 'Show Costs Price',
				set_lang 		 : 'Set Language',
				save_change		 : 'Save Change',
				system_select 	 : 'System Select One at Heigher Than',
				address 		 : 'Address',
				back 			: 'Back',
				front			: 'Front',
				tax 			: 'Tax Invoice',
				sum 			: 'Sum',
				total 			: 'Total',
				no_order 		: 'No Order',
				total_unit 		: 'Total Unit',
				total_price 	: 'Total Price',
				pcs 			: 'PCS',
				cancel_order 	: 'Cancel Order',
				confirm_order   : 'Order',
				update_order   : 'Update',
				remark 			: 'Remark',
				cancle 			: 'Cancle',
				add_product 	: 'Add Product',
				status 			: 'Order history',
				edit 			: 'Edit',
				preview 		: 'Preview',
				date_order		: 'Order Date',
				search_cust		: 'Search By Customer Name',
				transport		: 'Transport',
				manufact		: 'Manufacturer',
				model 			: 'Model',
				value 			: 'Value',
				code 			: 'Code',
				comment 		: 'Comment',
				product_detail	: 'Product Detail',
				ok				: 'OK',
				device 			: 'Device',
				sale 			: 'Sale',
				taxcode			: "Tax ID", 
				other  			: "Other", 
				email 			: "E-mail",
				fax  			: "Fax", 

			};

			$scope.txtmenus =  {
				index 		: 'Home',
				home 		: 'News Update',
				search 		: 'Search',
				order 		: 'Order',
				status 		: 'Order history',
				call_center : 'Call Center',
				aboutus 	: 'About us',
				setting 	: 'Setting',
				exit 		: 'Exit',
				product_detail : 'Product Detail',
				edit_order : 'Edit Order',


			}
		}
	},

	this.showUuid = function(){
		var $uuid = window.localStorage['wsp_uuid'];

		var createUUID = function(){
			var d = new Date().getTime();
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = (d + Math.random()*16)%16 | 0;
						d = Math.floor(d/16);
					return (c=='x' ? r : (r&0x3|0x8)).toString(16);
			});
			//alert('create uuid random');
			window.localStorage['wsp_uuid'] = uuid;
			return uuid;
		};

		 var patformDevice = ionic.Platform.platform();
		//	alert( 'platform is ' + patformDevice );
		if($uuid === undefined || $uuid == '' || $uuid === null){

			if (window.cordova) {

				if( patformDevice == 'ios' ){
					/*
					window.IDFVPlugin.getIdentifier(function(result){

										//alert('function uuid device is ');
										//alert() + result );
										//var deviceUUID = result; 
										window.localStorage['wsp_uuid'] = result;
										//$uuid = result;
                                      	return result;
                                    },
                                    function(error){
                                    	alert(' false create uuid');
                                      return false;
                                    });
                                    */
                     //alert('ios device');
                     return createUUID();
				}else{

					window.localStorage['wsp_uuid'] = $cordovaDevice.getUUID();
					$uuid = $cordovaDevice.getUUID();
				}
			}else{
				//$uuid =  
				//alert('Create Device UUID is  : ' + createUUID() );
				return createUUID();
			}
			$uuid = window.localStorage['wsp_uuid'];
		}
		//alert('uuid is ' + window.localStorage['wsp_uuid']);
		return window.localStorage['wsp_uuid']; //$uuid;

        //$scope.appInfo.uuid = deviceUUID;
    },

	this.dataUser = function(){
		var $user = window.localStorage['user'];
		var uuid = window.localStorage['wsp_uuid'];
		if( $user == '' || $user === undefined || $user === null){
			$http.get( base_ + '/app/profile/' + uuid )
				.then(function(result){
					if(result != 'false'){
						var $res = result.data;

						//$scope.profile = $res;
						window.localStorage['user'] = JSON.stringify( $res );
						return JSON.parse( window.localStorage['user'] );
					}
				
				},function(error){
					console.log('Error Userdata');
				});
		}else{
			return JSON.parse( $user );
		}

	},	
	this.resetUser = function(){
		var $user 	= window.localStorage['user'];
		var uuid 	= window.localStorage['wsp_uuid'];
		$http.get( base_ + '/app/profile/' + uuid ) 
				.then(function(result){

					if(result != 'false'){
						var $res = result.data;
						window.localStorage['user'] = JSON.stringify( $res );
						return $res;//JSON.parse( window.localStorage['user'] );
					}
				
				},function(error){
					console.log('Error Userdata' + JSON.stringify(error));
				});


	},	

	this.checkUuid = function($scope, $state, $location){
		this.showUuid();
		var uuid 	= window.localStorage['wsp_uuid'];

		$scope.uuid 	= uuid;
		console.log('checkUuid is ' + uuid  );
		
		$http.get( base_ + '/app/device/' + uuid )
			.then(function(result){
				var $res = result.data;
				if($res.random_number == '0'){
					$state.go('register');
					return false;
				}

				//alert('is status ' + $res.status );
				//alert('redirect home ' + JSON.stringify( $res ) );
				if($res.status == '1' || $res.status == '0' ) { 
					//&& $res.customer_id != 0){
					//alert('state go home');
					//$state.go('app.home');
					//$location.path('#/app/home');
					//alert(' status is ' + $res.status + ' and redirect t0 t')
					$state.go('app.home');

					//window.location.href = '#/app/home';

				}else if($res.status == '2' ){
					//alert('state go suspend');
					$state.go('suspend');
				}else{
					//if(navigator.connection.type !== Connection.NONE) 
					//alert('state go register');
					$state.go('register');
				};
			},function(error){
				//alert('Error check id ' + JSON.stringify( error ));
				//$scope.error = error;
				//if(navigator.connection.type !== Connection.NONE)
				$state.go('register');

			});
	},
	
	this.showProfile = function($scope){
		$scope.currDate = new Date();
		var uuid = window.localStorage['wsp_uuid'];
		$http.get( base_ + '/app/profile/' + uuid ).then(function(result){
			if( result != 'false' ){
				var $res = result.data;
				//console.log('result ' + $res.name);
				//console.log('dataSet result : ' + JSON.stringify( $res ));
				if($res.map_type == 'sale'){
					console.log('Sale status : ' + $res.mobile_mode);
					if($res.mobile_mode == 0)
						$state.go('suspend');
				}

				$scope.profile = $res;
				var $watermark = function(number){
					var $html = '';
					for(var $i = 0; $i <= number; $i++){
						$html += '<div class="watermark">'+ $res.code +'</div>';
					}
					return $html;
				}
				var $watermarkMatch = function(number){
					var $html = '';
					for(var $i = 0; $i <= number; $i++){
						$html += '<div class="watermark-match">'+ $res.code +'</div>';
					}
					return $html;
				}
			$scope.watermark = function(int){
				var num = (parseInt(int) <= 20 || int === undefined || int === null )  ? 20 : int;
				console.log('int is ' + num);
				return $watermark(num * 6);
			}

			$scope.sub_watermark = function(int){
				var num = ( parseInt(int) == 0 || int === undefined || int === null ) ? 20 : int;

				return $watermarkMatch(( num * 6 ));
			}
				
				if(window.localStorage['user'] == '')
					window.localStorage['user'] = JSON.stringify( $res );
			}
			
		},function(error){
			console.log('Error profile');
			$state.go('register');
		});
	}

	
})

.service('shoppingCart',function($state,$ionicPopup,$http,$window){
		this.cart 	= window.localStorage['cart'];
		this.cOrder = function(){
			return window.localStorage['cOrder'];
		};

		this.apOrder = function (){
			return window.localStorage['apOrder'];
		};
		
		this.addCart = function(json){

			var cart 	= $window.localStorage['cart'];// this.cart;

			console.log('$fin : ' + $fin + ' & cart is ' + cart );
			if(cart !== undefined && cart != '' && cart !== null ){
			var $fin 	= this.indexCart( json.product_id );
				var jsonCart = JSON.parse( cart );
				console.log( 'Cart True ' );
				if($fin !== false){
					jsonCart[$fin] = json;
					console.log('add by $fin true  : ' + JSON.stringify( jsonCart[$fin] ) );
				}
				var dataCart =  jsonCart ;
			}else{ 
				var dataCart = [];
				console.log('cart false');
			};
			
			if( $fin === false || $fin === undefined || $fin === null ){
				console.log('add by $fin false ' + JSON.stringify( json ) );
				dataCart.push(json);
			}
				this.updateCart(dataCart);
				var $time = window.localStorage['cartTime'];
				if($time === undefined || $time =='' || $time === null )
				this.setExpired('cartTime',60);
		};
		
		this.updateCart = function(data){
			window.localStorage['cart'] = JSON.stringify ( data );
			console.log( 'after update data json is ' + JSON.stringify( window.localStorage['cart'] ) );

		};

		
		this.indexCart = function(id){
			console.log('index cart is ' + id );
			if(this.cart == undefined || this.cart == '' || this.cart === null ) return false;
			var $cart = JSON.parse( this.cart );
			var ind;
			for($x = 0; $x < $cart.length; $x++){
					$n		= parseInt( $x );
					var c 	= $cart[$n];
					if(c.product_id == id)	ind = $x;
			}
			
			return ind;
		};
		
		this.onCart=function(id){
			console.log('this on cart data = ' + this.cart );
			if(this.cart == '' || this.cart === undefined|| this.cart === null ) return false;
			var ind = this.indexCart(id);
			var $cart = JSON.parse( this.cart );
			return $cart[ind];
		};
		
		this.onSum = function(field){
			if(this.cart === false || this.cart == '' || this.cart == undefined || this.cart === null ) return 0;
			var $cart = JSON.parse( this.cart );
			//console.log('count in cart :' + $cart[0].qty + ' | field is ' + field );
			var sum = 0;
			if(field == 'qty'){
				
				for($x = 0; $x < $cart.length; $x++){
					$n		= parseInt( $x );
					var c 	= $cart[$n];
					//var unit = c['qty'];
					//console.log( 'qty json = ' + c.qty );
					if(!c){
						console.log('c false');
						var qty = 0;
							
					}else{ 
						console.log('c true ' + c.qty );
						var qty = c.qty;
					}
						sum += qty;
				}
				
			}
			if(field == 'price'){
				
				for($x = 0; $x < $cart.length; $x++){
					$n		= parseInt( $x );
					var c 	= $cart[$n];
					if(!c){
						console.log('c false');
						var qty = 0;
						var price = 0;
							
					}else{ 
						console.log('c true ' + c.price );
						var qty = c.qty;
						var price = c.price;
					}
					
					sum += ( price * qty );
				}
				
			}
			console.log('sum : ' + sum);
			return sum;
		};
		
		this.removeCart = function(index){

			var dataCart = window.localStorage['cart'];
			var $cart = JSON.parse( dataCart );
			var updatedCart = [];
			angular.forEach($cart, function(value, key) {
				console.log('value : ' + JSON.stringify( value ) + ' | Key : ' + key + ' | index : ' + index );
				if(index != key){
					updatedCart.push(value);
				}
			});

			//delete $cart[index];
			//console.log('delete json index : ' + index );
			/*

				angular.forEach($cart, function(item) {
					console.log('item remain : ' + JSON.stringify( item ) );
				if (item) updatedCart.push(item);
			});
			*/
			this.updateCart( updatedCart );
			
		}

		this.cancleCart = function(gopage){
		 	var confirmPopup = $ionicPopup.confirm({
					title : 'ยืนยันการยกเลิก', 
					template: 'ยกเลิกรายการสั่งซื้อสินค้าในรายการทั้งหมด'
				});

				confirmPopup.then(function(res) {
					if(res) {
						//window.localStorage['cart'] = '';
						$window.localStorage.removeItem('cart');
						console.log('remove cart');
						if($window.localStorage['cart'] !== undefined || $window.localStorage['cart'] !== null)
							return this.cancleCart(gopage);

						if(gopage != 'reload'){
							$state.go(gopage);
						}else{
							console.log('reload');
							$state.go($state.current, {}, {reload: true});
						}

					}
				});
		};

		this.clearCart = function(){
			$window.localStorage.removeItem('cart');
		}

		this.orderAppend = function(json){

			var apOrder 	= this.apOrder();
			var cOrder		= this.cOrder();

			var $fin 	= this.indexCart(json.product_id);
			console.log('$fin : ' + $fin + ' & apOrder is ' + apOrder );
			if(apOrder !== undefined && apOrder != '' && apOrder !== null ){
				var ap = JSON.parse( apOrder );
				var jsonCart = ap.cOrder;
				console.log( 'Cart True ' );
				if($fin !== false){
					jsonCart[$fin] = json;
					console.log('add by $fin true  : ' + JSON.stringify( jsonCart[$fin] ) );
				}
				var dataCart =  jsonCart ;
			}else{ 
				var dataCart = [];
			};
			
			if($fin === false || $fin === undefined || $fin === null ){
				console.log('add by $fin false ' + JSON.stringify( json ) );
				dataCart.push(json);
			}
				this.orderUpdate(dataCart);
		}

		this.orderUpdate = function(data){
			var cOrder = this.cOrder();
			window.localStorage['apOrder'] = JSON.stringify ( {cOrder : data } );
		}

		this.orderIndex = function(id){

			if(this.apOrder() == undefined || this.apOrder() == ''  || this.apOrder() === null ) return false;
			var apOrder = JSON.parse( this.apOrder() );
			var cOrder 	= this.cOrder();
			var ind;
			for($x = 0; $x < apOrder.cOrder.length; $x++){
					$n		= parseInt( $x );
					var c 	= $cart[$n];
					if(c.product_id == id)	ind = $x;
			}
			
			return ind;
		}

		this.orderSum = function(field){
			if(this.apOrder() === false || this.apOrder() == '' || this.apOrder() == undefined || this.apOrder() === null ) return 0;
			var cOrder = this.cOrder();
			var apOrder = JSON.parse( this.apOrder() );
			var sum = 0;
			var ap 	= apOrder.cOrder;
			if(field == 'qty'){
				if(ap.length > 0 )
				for($x = 0; $x < ap.length; $x++){
					$n		= parseInt( $x );
					var c 	= ap[$n];
					if(!c){
						var qty = 0;
							
					}else{ 
						var qty = c.qty;
					}
						if(ap[$n].order_id == cOrder)
						sum += qty;
				}
				
			}

			if(field == 'price'){
				if(ap.length > 0 )
				for($x = 0; $x < ap.length; $x++){
					$n		= parseInt( $x );
					var c 	= ap[$n];
					if(!c){
						var qty = 0;
						var price = 0;
							
					}else{ 
						var qty = c.qty;
						var price = c.price;
					}
					if(ap[$n].order_id == cOrder)
					sum += ( price * qty );
				}
				
			}
			return sum;
		};

		this.orderRemove = function(index){
			var apData = this.apOrder();
			console.log('apOrder ' + apData);

			var ap = JSON.parse( apData );

			var $cart = ap.cOrder;

			console.log('remove order node ' + index + ' is ' + JSON.stringify( $cart[index] ));
			delete $cart[index];
			var updatedCart = [];
				angular.forEach($cart, function(item) {
				if (item) updatedCart.push(item);
			});
			console.log('remove order json is ' + JSON.stringify( updatedCart ));
			this.orderUpdate( updatedCart );
		};
		this.orderClear = function(){
			$window.localStorage.removeItem('cOrder');
			$window.localStorage.removeItem('apOrder');
		};

		this.setExpired = function(storage,minute){
			var cr = new Date();
			var exp = parseInt(cr.getTime() + ( minute * 60000 ) );
			console.log('Current Time ' + cr.getTime() );
			console.log('Expired Time ' 	+ exp );
			var strg = window.localStorage[storage];
			var cart = window.localStorage['cart'];
			if((strg =='' || strg === undefined || strg === null ) && (cart != '' && cart !== undefined && cart !== null )){
				window.localStorage[storage] = exp;
			}

		};

		this.timeExpired = function(storage){
			var cr = new Date();
			var $this = this;
			var $exp = window.localStorage[storage];
			var cart = window.localStorage['cart'];
			if(cart != '' && cart !== undefined && cart !== null ){
				if( $exp != '' && $exp !== undefined && $exp === null && $exp < cr.getTime() ){
					var alertPopup = $ionicPopup.alert({
							title: 'System Error!!',
							template: 'การทำรายการหมดอายุ กรุณาทำรายการใหม่อีกครั้ง'
						});
						
						alertPopup.then(function(res) {
							//$state.go('app.home');

							$this.clearCart();
							$window.localStorage.removeItem(storage);
							$state.go('app.search');
					   });

				}
			}
		}
		
});