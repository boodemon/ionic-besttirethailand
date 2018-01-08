angular.module('thaibesttire.appControllers', [])

.controller('AppCtrl', function($scope,$state, $ionicHistory,wdata,$ionicPopup,$cordovaDevice,$ionicLoading,$ionicModal,shoppingCart ){
	wdata.showProfile($scope);
	wdata.dataSet($scope);


	var getPlatform = window.cordova ? $cordovaDevice.getPlatform() : '';
	$scope.platform = getPlatform.toLowerCase();

	//alert($scope.platform);
	$scope.exitApp = function(e){
		//e.preventDefault();
		var confirmPopup = $ionicPopup.confirm({
					title : 'ยืนยันการออกจากระบบ', 
					template: 'ต้องการออกจากระบบ'
				});

				confirmPopup.then(function(res) {
					if(res) {
						//ionic.Platform.exitApp();
						navigator.app.exitApp();
					}
				});
	}

});

