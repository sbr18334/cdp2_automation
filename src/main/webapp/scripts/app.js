angular.module('app',['ui.router',"uiRouterStyles"])
.controller('MainController',function($scope,$window,$http,$state,$location,$rootScope){
	
	$('#display').css('display','none');

	$scope.user = localStorage.user;
	$(".welcome").hide();
	
	if(localStorage.user == null){
		document.location.href = "scripts/login/login.html";
	}
	else{
		$state.go('overview');
		$('#display').css('display','block');
	}
	
	if($location.path() == ""){
		$location.path('/overview/performance');
	}

	if(localStorage.login_check == 0){
		$(".welcome").show();
		$(".welcome").css('z-index','1000');
		$(".welcome").fadeOut(3000);
		$(".icons").hide();
		$(".icons").delay(3000).fadeIn('slow');
		localStorage.login_check = 1;
	}

	$scope.print = function(){
		window.print();
	}
	
	$scope.logout = function(){
		localStorage.removeItem('user');
		document.location.href = "scripts/login/login.html";
	}
  //alert($(window).width());
    if($rootScope.month == null){
        
    }
});