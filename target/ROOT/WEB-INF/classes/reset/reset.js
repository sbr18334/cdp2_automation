angular.module('app',[])
  .controller('ResetController', function ($scope) {
	  
	  $('#success').hide();
	  $('#error').hide();
	  
	  $('#login_field').on('input',function(e){
		  $('#success').hide();
		  $('#error').hide();
	  });
	  
	  $scope.homePage=function(){
		  if($scope.password1 != $scope.password2){
			  $('#success').hide();
			  $('#error').show();
		  }
		  else{
			  $('#error').hide();
			  $('#success').show();
		  }
	  };
	  
  });