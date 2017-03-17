// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//
angular.module('thaibesttire', ['ionic','ngCordova', 'thaibesttire.appControllers', 'thaibesttire.controllers','thaibesttire.orderControllers','thaibesttire.productControllers', 'thaibesttire.service', 'ionic-datepicker','ionic-autocomplete'])

.run(function($rootScope, $ionicPlatform, $ionicHistory, $state,$ionicPopup,$cordovaNetwork){
  $ionicPlatform.ready(function() {
    /* :; CHECK CONNECTION INTERNET 
    ======================================================================================================== */
   if(window.Connection) {
        
      if(navigator.connection.type == Connection.NONE) {
          var alertPopup = $ionicPopup.alert({
                title: "Internet Disconnected",
                content: "The internet is disconnected on your device."
          });

          alertPopup.then(function(res) {
                ionic.Platform.exitApp();
               // navigator.app.exitApp();
          });
      }
    };
    /* :: DOUBLE BACK EXIT APP
    ======================================================================================================== */
    $ionicPlatform.registerBackButtonAction(function(e){
      if ($rootScope.backButtonPressedOnceToExit) {
        //alert('EXIT APP');
        ionic.Platform.exitApp();
      }

      else if ($ionicHistory.backView()) {
        //alert('History Back');
        if( $state.current.name == 'app.home' ){
            var confirmPopup = $ionicPopup.confirm({
                  title : 'ยืนยันการออกจากระบบ', 
                  template: 'ต้องการออกจากระบบ'
                });

          confirmPopup.then(function(res) {
            if(res) {
              ionic.Platform.exitApp();
            }
          });

        }else{
          $ionicHistory.goBack();
        }
      }
      else {
        $rootScope.backButtonPressedOnceToExit = true;
        window.plugins.toast.showShortCenter(
          "Press back button again to exit",function(a){
            //alert('EXIT APP SUCCESS');
          },function(b){
            ionic.Platform.exitApp();
            //alert('ERROR EXIT');
          }
        );
        setTimeout(function(){
          $rootScope.backButtonPressedOnceToExit = false;
        },600);
      }
      e.preventDefault();
      return false;
    },101);

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.


    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }

  });
})
.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'template/customer-menu.html',
        controller: 'AppCtrl'
    })
	/* Starter loading page //
	===================================================================================================*/
	.state('starter',{
		url 		: '/starter',
		templateUrl : 'template/starter.html',
		controller 	: 'StarterController'
	})	

  /* View Sespend Page
  ===================================================================================================*/
  .state('suspend', {
      url: '/suspend',
      templateUrl: 'template/suspen.html',
      controller: 'SuspendController'
    })  

  /* Register page //
	===================================================================================================*/
	.state('register',{
		url 		: '/register',
    templateUrl : 'template/starter.html',
		//templateUrl	: 'template/register.html',
		controller	:	'RegisterController'
	})
	/* Home page //
	===================================================================================================*/
	.state('app.home',{
		url : '/home',
		views: {
            'menuContent': {
				templateUrl : 'template/home.html',
				controller 	:	'HomeController'
			}
        }
		
	})
	
	/* View News //
	===================================================================================================*/
    .state('app.news', {
      cache: false,
      url: '/news/:newsID',
      views: {
        'menuContent': {
          templateUrl: 'template/news.html',
          controller: 'NewsController'
        }
      }
    })	
	
	/* View Search Product 
	===================================================================================================*/
	
    .state('app.search', {
      //cache: false,
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'template/search.html',
          controller: 'SearchController'
        }
      }
    })	
	/* View Search Product 
	===================================================================================================*/
	
    .state('app.keywords', {
      //cache: false,
      url: '/keywords',
      views: {
        'menuContent': {
          templateUrl: 'template/keywords.html',
          controller: 'KeywordsController'
        }
      }
    })	
	/* View Search Product 
	===================================================================================================*/
	
    .state('app.matching', {
      //cache: false,
      url: '/matching',
      views: {
        'menuContent': {
          templateUrl: 'template/matching.html',
          controller: 'MatchingController'
        }
      }
    })
	/* View Product Detail
	===================================================================================================*/
	.state('app.product', {
      cache: false,
      url: '/product/:productID',
      views: {
        'menuContent': {
          templateUrl: 'template/product.html',
          controller: 'ProductController'
        }
      }
    })	
  /* View Summary Order
  ===================================================================================================*/
  .state('app.summary', {
      cache: false,
      url: '/summary',
      views: {
        'menuContent': {
          templateUrl: 'template/summary.html',
          controller: 'SummaryController'
        }
      }
    })  

  /* View Edit Order
  ===================================================================================================*/
  .state('app.edit', {
      cache: false,
      url: '/edit/:orderID',
      views: {
        'menuContent': {
          templateUrl: 'template/edit.html',
          controller: 'EditController'
        }
      }
    })  

  /* View View Order
  ===================================================================================================*/
  .state('app.view', {
      cache: false,
      url: '/view/:orderID',
      views: {
        'menuContent': {
          templateUrl: 'template/view.html',
          controller: 'ViewController'
        }
      }
    })  

	/* View List Order & History
	===================================================================================================*/
	.state('app.order', {
     // cache: false,
      url: '/order',
      views: {
        'menuContent': {
          templateUrl: 'template/order.html',
          controller: 'OrderController'
        }
      }
    })	

  /* View Setting Page
  ===================================================================================================*/
  .state('app.callcenter', {
      cache: false,
      url: '/callcenter',
      views: {
        'menuContent': {
          templateUrl: 'template/callcenter.html',
          controller: 'CallController'
        }
      }
    })  

  /* View Setting Page
  ===================================================================================================*/
  .state('app.about', {
      cache: false,
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'template/about.html',
          controller: 'AboutController'
        }
      }
    })  

  /* View Setting Page
  ===================================================================================================*/
  .state('app.setting', {
      cache: false,
      url: '/setting',
      views: {
        'menuContent': {
          templateUrl: 'template/setting.html',
          controller: 'SettingController'
        }
      }
    })  

  /* View Setting Page
  ===================================================================================================*/
  .state('app.test', {
      cache: false,
      url: '/test',
      views: {
        'menuContent': {
          templateUrl: 'template/test.html',
          //controller: 'SettingController'
        }
      }
    })  

	/* View First Default Page
	===================================================================================================*/
	$urlRouterProvider.otherwise('/starter');
});