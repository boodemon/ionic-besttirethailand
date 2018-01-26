var base_ = 'http://www.besttirethailand.com/wsp/public';
var img_ = 'http://www.besttirethailand.com/wsp/public/images';

angular.module('thaibesttire.controllers', [])

.controller('StarterController',function($scope,$timeout,$state,$http,wdata,$ionicViewService,shoppingCart,$ionicPopup,$cordovaDevice, $location) {
	alert('starter page');
	window.localStorage.removeItem('user');	
		$timeout(function() {
			wdata.checkUuid($scope,$state, $location);
		}, 1000);


 })
   
  /* Suspend Controller page 
  ---------------------------------------------------------------------------------------------------*/

 .controller('SuspendController', function($scope,$state, wdata,$http,$ionicLoading,shoppingCart,$ionicViewService) {
 		shoppingCart.orderClear();
		var uuid = window.localStorage['wsp_uuid'];

		$ionicLoading.show({
			template: 'Loading...'
		});
	var $user = wdata.dataUser();
/*
	if($user.mobile_mode == 1){
		$state.go('app.home');
	}
	*/
 	$scope.user = $user;
 	$scope.profile = $user;
	
		$http.get( base_ + '/app/about').then(function(result){
			var $res = result.data;
			console.log('result : ' + JSON.stringify($res));
			$scope.about = $res;
			$scope.imgs = base_  + '/images';

			$ionicLoading.hide();
		},function(error){
			alert('Error' + error );
			$ionicLoading.hide();
		});
    // Set Ink
	wdata.dataSet($scope);
	wdata.showProfile($scope);
 })
  /* Home Controller page 
  ---------------------------------------------------------------------------------------------------*/

 .controller('HomeController', function($scope,$state, wdata,$http,$ionicLoading,shoppingCart,$ionicViewService,$cordovaToast,$ionicPopup) {
	 // TEST TAOSE //
	 	alert('home page');
		 var onCart = window.localStorage['cart'];
		 alert('on cart ' + onCart );
		if( onCart != '' && onCart !== undefined && onCart !== null){
			var confirmPopup = $ionicPopup.confirm({
					title : 'System Alert', 
					template: 'คุณมีรายการออร์เดอร์ที่สั่งก่อนหน้านี้ คุณต้องการที่จะดำเนินการต่อหรือไม่'
				});

				confirmPopup.then(function(res) {
					if(res) {
						var cr = new Date();
						var exp = parseInt(cr.getTime() + ( 60 * 60000 ) );
						window.localStorage['cartTime'] = exp;
					}else{
						window.localStorage.removeItem('cart');
						window.localStorage.removeItem('cartTime');
					}
				});
		}
		

 		shoppingCart.orderClear();
		var uuid = window.localStorage['wsp_uuid'];
		wdata.dataUser();

		console.log('on cart ' + shoppingCart.cart);
		function news(){
			$ionicLoading.show({
				template: 'Loading...'
				//templateUrl : 'template/loading.html'
			});
			$http.get( base_ + '/app/news?uuid=' + uuid).then(function(result){
				var $res = result.data;
				$scope.news = $res;
				$scope.imgs = base_  + '/images/news';
				$ionicLoading.hide();
			},function(error){
				console.log('News Error');
				$scope.news = [];
				$ionicLoading.hide();

			})
			 .finally(function() {
       			// Stop the ion-refresher from spinning
		       $scope.$broadcast('scroll.refreshComplete');
		     });
		};

		 $scope.doRefresh = function() {
	 		console.log('reload');
	 		news();
	 		//window.$state.go($state.current, {}, {reload: true});
	 	}
	 	news();
    // Set Ink
	wdata.dataSet($scope);
	wdata.showProfile($scope);
 })
   
  /* News Controller page 
  ---------------------------------------------------------------------------------------------------*/

 .controller('NewsController',function($scope,$http,$state,wdata,$stateParams,$timeout, $ionicLoading,$ionicHistory){
 		window.localStorage['cOrder'] = '';
		window.localStorage['apOrder'] = '';
		$ionicLoading.show({
			template: 'Loading...'
		});

		var $user = wdata.dataUser(); //JSON.parse( window.localStorage['user'] );
		$http.get( base_ + '/app/news/' + $stateParams.newsID).then(function(result){
			var $res = result.data;
			$scope.news = $res;
			$scope.imgs = base_  + '/images/news';
			$ionicLoading.hide();
		},function(error){
			console.log('Error');
		});



    // Set Ink
	wdata.dataSet($scope);
	wdata.showProfile($scope);
 })
  
 
   
  /* Call Center Controller page 
  ---------------------------------------------------------------------------------------------------*/

 .controller('CallController',function($scope,$http,$state,wdata,$timeout, $ionicLoading,$ionicHistory){
  		window.localStorage['cOrder'] = '';
		window.localStorage['apOrder'] = '';
		$ionicLoading.show({
			template: 'Loading...'
		});

	var $user = wdata.dataUser();
 	$scope.user = $user;


	
		$http.get( base_ + '/app/about').then(function(result){
			var $res = result.data;
			console.log('result : ' + JSON.stringify($res));
			$scope.about = $res;
			$scope.imgs = base_  + '/images';
			
			$ionicLoading.hide();
		},function(error){
			console.log('Error');
		});

    // Set Ink
	wdata.dataSet($scope);
	wdata.showProfile($scope);
 })
  
    
  /* About Us Controller page 
  ---------------------------------------------------------------------------------------------------*/

 .controller('AboutController',function($scope,$http,$state,wdata,$timeout, $ionicLoading,$ionicHistory, shoppingCart){
  		shoppingCart.orderClear();
		$ionicLoading.show({
			template: 'Loading...'
		});

	var $user = wdata.dataUser();
 	$scope.user = $user;
	
      	ionic.Platform.ready( function(){
      		if( window.cordova ){
		 	cordova.getAppVersion.getVersionNumber().then(function (version) {
		    	$('.version').text('Version : ' + version);
		    	$scope.version = version;
			});
		 	}
		});

		$http.get( base_ + '/app/about').then(function(result){
			var $res = result.data;
			console.log('result : ' + JSON.stringify($res));
			$scope.about = $res;
			$scope.imgs = base_  + '/images';
			$scope.about_other = $res.other;
			$ionicLoading.hide();
		},function(error){
			console.log('Error');
		});

    // Set Ink
	wdata.dataSet($scope);
	wdata.showProfile($scope);
 })
  

 /*:: Setting Controller use in Setting Page 
 ------------------------------------------------------------------------------------------------------*/
 .controller('SettingController',function($scope,wdata,$http,$ionicLoading,$compile,$ionicPopup,$window,$ionicHistory,shoppingCart,$cordovaGeolocation,$state){
	$ionicLoading.show({
		template: 'Loading...'
	});
 	shoppingCart.orderClear();
	var $lang = window.localStorage['lang'];

	wdata.dataSet($scope);
	wdata.showProfile($scope);

	 $scope.doRefresh = function() {
	 	console.log('reload');
	 	$scope.$broadcast('scroll.refreshComplete');
	 	$state.go($state.current, {}, {reload: true});
	 	//$state.go('app.setting');//.$state.go($state.current, {}, {reload: true});
	 }
	

	var uuid 	= window.localStorage['wsp_uuid'];
	var $user 	= 	wdata.dataUser(); // JSON.parse(window.localStorage['user']);
	var $showp 	= 	$user.show_price == 'full' ? 'wholesale' : $user.show_price;
	var lang 	=	($lang !== undefined && $lang != '') ? $lang : 'th';
	console.log('user : ');
	console.log($user);
	$scope.user = $user;
	
	$scope.setting = {
		percent : 	$user.selling_percentage,
		price	:	$user.selling_lowest
	};
	//console.log('show price : ' + $user.show_price +' | ' + $showp );
	$scope.filter = {
		show : $showp,
		lang : lang
	}

/* START MAP 
=======================================================================================================*/
	
	function initialize() {
		//if($user.lat != '' && $user.lat !== undefined && $user.lon != '' && $user.lon !== undefined){
			var $lat = $user.lat != '' ? $user.lat : 14.40062;
			var $lon = $user.lon != '' ? $user.lon : 100.72136;
			var $zoom = ($user.lon != '' && $user.lat != '') ? 15 : 5;
/*
			var $lat = 13.796630;//$user.lat;
			var $lon = 100.573407;//$user.lon;
			console.log('google map active ' + $lat + ' | ' + $lon );
*/

	        var myLatlng = new google.maps.LatLng($lat,$lon);
	        var mapOptions = {
	          			center: myLatlng,
	          			zoom: $zoom,
	          			mapTypeId: google.maps.MapTypeId.ROADMAP
	        	};

	        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	        
	        var marker = new google.maps.Marker({
	          	position: myLatlng,
	          	map: map,
	          	title: $user.name
	        });

	        $scope.map = map;
	        console.log(map);
	       // $scope.mapError = map;
    //	}
        
    }

    //google.maps.event.addDomListener(window, 'load', initialize);
    
      	ionic.Platform.ready(initialize); 

	$ionicLoading.hide();

	$scope.openMap = function(){
	  	if($user.lat !== '' && $user.lon !== ''){
	  		console.log('open map is ' + $user.lat + ' &&  ' + $user.lon);
	  		$window.location.href = 'geo:'+ $user.lat +',' + $user.lon;
		}
	}


		/* END MAP 
		=================================================================================================== */
		$scope.doSetting = function(){
			console.log('update setting');
			var request = $http({
	              method: "post",
	              url: base_ + "/app/profile",
	              data: {
	              	  uuid 					: window.localStorage['wsp_uuid'],
					  id 					: $user.id,
					  map_type 				: $user.map_type,
					  show_price 			: $scope.filter.show,
					  lang 					: $scope.filter.lang,
					  selling_percentage 	: $scope.setting.percent,
					  selling_lowest 		: $scope.setting.price,
	              },

	             headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	        });
	        request.success(function (data) {
	            console.log(data);
	            console.log('languese ' + $scope.filter.lang);
	            wdata.resetUser();
	            window.localStorage['lang'] = $scope.filter.lang;
				 var alertPopup = $ionicPopup.alert({
						 	title: 'System Alert',
						 	template: "ทำการอัพเดทข้อมุล การตั้งค่าเรียบร้อยแล้วค่ะ \nขอขอบคุณค่ะ"
					   	});

					   	alertPopup.then(function(res) {
						 	console.log('Thank you Setting update');
						 	//$state.go('app.setting');
						 	$state.go($state.current, {}, {reload: true});
						 	//window.$state.go($state.current, {}, {reload: true});
						});
	            $ionicLoading.hide();
	        });
        }
 })
 /*:: REGISTER CONTROLLER PAGE 
 --------------------------------------------------------------------------------------------*/
 .controller('RegisterController',function($ionicPlatform,$scope,$http,$state,wdata,$ionicLoading,$cordovaDevice){

	wdata.dataSet($scope);
	//wdata.checkUuid($scope,$state);
	//wdata.showUuid($scope);

    $scope.appInfo = {};
	window.localStorage['user'] = '';

	$ionicLoading.show({
			template: 'Loading...'
	});

    var deviceUUID = window.localStorage['wsp_uuid'];

    $scope.uuid = deviceUUID;
	$scope.deviceID =  deviceUUID;
	if(deviceUUID === null || deviceUUID === undefined || deviceUUID == ''){
		wdata.showUuid($scope);
		deviceUUID = window.localStorage['wsp_uuid'];
	}
	//alert('register page');
	$http.get( base_ + '/app/device/' + deviceUUID )
			.then(function(result){
				//alert( JSON.stringify( result.data ) );
				var $res = result.data;
				var nb = $res.random_number;
				//alert('random number is ' + nb);

				if($res.random_number != 0){
					//alert('a');
					$state.go('app.home');

				}else{
					runuuid();
				}
					//$scope.errorLog = data
				$ionicLoading.hide();
			},function(error){
				runuuid();
				//alert('c');
				$ionicLoading.hide();
			});


	//$scope.doRegister = function(){
	function runuuid(){
		var $platform = ionic.Platform.platform();
		var devicePatform 		=  	ionic.Platform.platform();
		var deviceVersion 		=  	ionic.Platform.version();
		alert('platform is ' + $platform );
		if( $platform == 'ios'){
			var deviceModel 		=  	ionic.Platform.platform() + ' Device';
		}else{
			var deviceModel 		=  	window.cordova ? ( $cordovaDevice.getModel() !== null ?  $cordovaDevice.getModel() : 'unknow' ): devicePatform + '';
		}
		var deviceMobile 		= 	ionic.Platform.device();
		$http({
			method: "POST",
			url: base_ + "/app/device",
			data: {
				uuid 		: deviceUUID,
				device_type : deviceModel,
				device_info : devicePatform +' version : ' + deviceVersion + ' ' + deviceModel ,
			},
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.then(function(data){
				console.log('register process');
				var $res = data.data;
				//window.$state.go($state.current, {}, {reload: true});//href="/#/app/home";
				//alert('d');
	           	$state.go('app.home');
	            $ionicLoading.hide();
			},
			function(error){
				//alert('e');
				alert('Error No process register ' + JSON.stringify( error ) );
				$scope.errorLog = error;
				$ionicLoading.hide();
	         });
		
	 		//console.log('register ' );
	}

    $ionicLoading.hide();
 });
 