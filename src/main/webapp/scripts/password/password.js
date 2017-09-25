angular.module('app',[])
  .controller('PasswordController', function ($scope) {
	  
	  $('#success').hide();
	  $('#error').hide();
	  
	  $scope.homePage=function(){
		  $('#success').show();
	  };
	  
  });