angular.module('app',['ui.router',"uiRouterStyles"])
.controller('MainController',function($scope,$window,$http,$state){
	
	$('#display').css('display','none');

	if(sessionStorage.user == null){
		document.location.href = "scripts/login/login.html";
	}
	else{
		$state.go('overview');
		$('#display').css('display','block');
	}
	

	$scope.print = function(){
		window.print();
	}
	
	$scope.logout = function(){
		sessionStorage.removeItem('user');
		document.location.href = "scripts/login/login.html";
	}
  //alert($(window).width());

})

