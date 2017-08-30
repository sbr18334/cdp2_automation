angular.module('app',['ui.router',"uiRouterStyles"])
.controller('MainController',function($scope,$window,$http,$state){
	if(sessionStorage.user == null){
		document.location.href = "scripts/login/login.html";
	}
	else{
		$state.go('overview');
	}
	
	$scope.logout = function(){
		sessionStorage.removeItem('user');
		document.location.href = "scripts/login/login.html";
	}
  //alert($(window).width());

});
