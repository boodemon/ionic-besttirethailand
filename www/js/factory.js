.factory('thaibesttireFactory',['$state','$ionicPlatform','$ionicHistory','$timeout',function($state,$ionicPlatform,$ionicHistory,$timeout){
	var obj = {}
		obj.backcallfun = function(){
			var backbutton=0;
		    $ionicPlatform.registerBackButtonAction(function(e){
		      	if($state.current.name=="app.home"){
		        	alert('this home');
		         	if(backbutton==0){
		            	backbutton++;
		              	window.plugins.toast.showShortCenter('Press again to exit');
		            	$timeout(function(){backbutton=0;},5000);
		        	}else{
		            	navigator.app.exitApp();
		        	}
		      	}else {
		  
		      	}
		    	e.preventDefault();
		    	return false;
		  	},101);
		}
	return obj;
}]);